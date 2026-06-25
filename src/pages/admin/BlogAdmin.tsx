import React from 'react';
import { useState, useEffect } from "react";
import { LogIn, LayoutDashboard, FileText, List, FileEdit, CheckCircle, Settings, LogOut, Search, Bell, User as UserIcon, Users, Menu, ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, orderBy, limit, onSnapshot, updateDoc } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../../utils/firestoreErrorHandler";

import { DashboardHome } from "./views/DashboardHome";
import { GenerateArticle } from "./views/GenerateArticle";
import { BulkGenerate } from "./views/BulkGenerate";
import { AllArticles } from "./views/AllArticles";
import { EditArticle } from "./views/EditArticle";
import { SEOSettings } from "./views/SEOSettings";
import { TeamManagement } from "./views/TeamManagement";
import { InquiriesList } from "./views/InquiriesList";
import { SubscribersList } from "./views/SubscribersList";
import { PortfolioManager } from "./views/PortfolioManager";

const ALLOWED_ADMINS = [
  "devabdultechnologies@gmail.com",
  "aalqutijifawy@gmail.com",
  "eduverseai76@gmail.com"
];

export function BlogAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAdminChecking, setIsAdminChecking] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('isSidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('isSidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);
  
  const [loginError, setLoginError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "reset">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const isAllowedAdmin = currentUser?.email && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase());
      
      // Block unverified email/password users (unless they are explicitly allowed admins)
      if (currentUser && !currentUser.emailVerified && currentUser.providerData.some(p => p.providerId === 'password') && !isAllowedAdmin) {
        setUnverifiedEmail(currentUser.email || "");
        setShowVerificationScreen(true);
        setUser(currentUser);
        setIsAdmin(false);
        setIsAuthReady(true);
        return;
      }

      setShowVerificationScreen(false);
      setUser(currentUser);
      if (currentUser) {
        setIsAdminChecking(true);
        try {
          const userRef = doc(db, "users", currentUser.uid);
          let userSnap;
          try {
            userSnap = await getDoc(userRef);
          } catch (e) {
            handleFirestoreError(e, OperationType.GET, `users/${currentUser.uid}`);
            throw e;
          }
          
          const isAllowedAdmin = currentUser.email && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase());
          
          let role = isAllowedAdmin ? "admin" : "user";
          let status = 'active';
          let inTeamMembers = false;

          // Check if user is in team_members collection
          if (currentUser.email) {
            const teamMemberRef = doc(db, "team_members", currentUser.email.toLowerCase());
            try {
              const teamMemberSnap = await getDoc(teamMemberRef);
              if (teamMemberSnap.exists()) {
                const teamData = teamMemberSnap.data();
                role = teamData.role || role;
                status = teamData.status || status;
                inTeamMembers = true;
              }
            } catch (e) {
              handleFirestoreError(e, OperationType.GET, `team_members/${currentUser.email.toLowerCase()}`);
              throw e;
            }
          }
          
          if (!userSnap.exists()) {
            try {
              await setDoc(userRef, {
                email: currentUser.email,
                role: role,
                status: status,
                createdAt: serverTimestamp()
              });
            } catch (e) {
              handleFirestoreError(e, OperationType.WRITE, `users/${currentUser.uid}`);
              throw e;
            }
            
            if (status === 'inactive' && !isAllowedAdmin) {
              await signOut(auth);
              setLoginError("Your account has been deactivated. Please contact an administrator.");
              setIsAdmin(false);
              setIsAuthReady(true);
              return;
            }
            setIsAdmin(role === "admin" || role === "editor");
          } else {
            const data = userSnap.data();
            
            if (inTeamMembers) {
              try {
                await updateDoc(userRef, {
                  role: role,
                  status: status
                });
              } catch (e) {
                handleFirestoreError(e, OperationType.UPDATE, `users/${currentUser.uid}`);
                throw e;
              }
            } else {
              // If not in team_members and not a super admin, downgrade to user
              role = isAllowedAdmin ? "admin" : "user";
              status = data.status || "active";
              
              // Only update if their role was previously elevated
              if (data.role === "admin" || data.role === "editor") {
                try {
                  await updateDoc(userRef, {
                    role: "user"
                  });
                } catch (e) {
                  console.error("Failed to downgrade user role", e);
                }
              }
            }
            
            if (status === 'inactive' && !isAllowedAdmin) {
              await signOut(auth);
              setLoginError("Your account has been deactivated. Please contact an administrator.");
              setIsAdmin(false);
              setIsAuthReady(true);
              return;
            }
            setIsAdmin(role === "admin" || role === "editor" || isAllowedAdmin);
          }
        } catch (error) {
          // Fallback: if they are in the allowed list, still grant admin access in UI
          const isAllowedAdmin = currentUser.email && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase());
          setIsAdmin(!!isAllowedAdmin);
        } finally {
          setIsAdminChecking(false);
        }
      } else {
        setIsAdmin(false);
        setIsAdminChecking(false);
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notifs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "notifications");
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "notifications", id), { read: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `notifications/${id}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoginError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed", error);
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        setLoginError("Popup blocked by browser. Please allow popups for this site and try again, or use Email/Password sign in.");
      } else {
        setLoginError(error.message || "Google login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setVerificationMessage("");
    setIsLoading(true);

    try {
      const { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, deleteUser, sendPasswordResetEmail } = await import("firebase/auth");
      
      if (authMode === "reset") {
        if (!email) {
          throw new Error("Please enter your email address to reset your password.");
        }
        await sendPasswordResetEmail(auth, email);
        setVerificationMessage("Password reset email sent. Please check your inbox.");
        setAuthMode("signin");
        return;
      } else if (authMode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
        }

        // Whitelist check
        const emailLower = email.toLowerCase();
        let isAllowed = ALLOWED_ADMINS.includes(emailLower);
        
        if (!isAllowed) {
          const teamMemberDoc = await getDoc(doc(db, 'team_members', emailLower));
          if (teamMemberDoc.exists()) {
            isAllowed = true;
          }
        }

        if (!isAllowed) {
          throw new Error("Your email is not authorized to register. Please contact an administrator to be added to the team.");
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        
        setUnverifiedEmail(email);
        setShowVerificationScreen(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const currentUser = userCredential.user;
        const isAllowedAdmin = currentUser.email && ALLOWED_ADMINS.includes(currentUser.email.toLowerCase());
        
        if (!currentUser.emailVerified && !isAllowedAdmin) {
          const creationTime = new Date(currentUser.metadata.creationTime || Date.now()).getTime();
          const now = Date.now();
          
          if (now - creationTime > 24 * 60 * 60 * 1000) {
            await deleteUser(currentUser);
            await signOut(auth);
            throw new Error("Your verification link expired after 24 hours. Your unverified account has been removed. Please sign up again.");
          }

          const attemptsKey = `unverified_attempts_${email}`;
          const attempts = parseInt(localStorage.getItem(attemptsKey) || "0") + 1;
          localStorage.setItem(attemptsKey, attempts.toString());
          
          if (attempts >= 10) {
            await signOut(auth);
            throw new Error("Email not verified. Please check your inbox or spam folder.");
          } else {
            setUnverifiedEmail(email);
            setShowVerificationScreen(true);
          }
        } else {
          localStorage.removeItem(`unverified_attempts_${email}`);
          setShowVerificationScreen(false);
        }
      }
    } catch (error: any) {
      console.error("Auth failed", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setLoginError("Invalid email or password");
      } else if (error.code === 'auth/email-already-in-use') {
        setLoginError("Email is already registered. Please log in instead.");
        setAuthMode("signin");
        setPassword("");
        setConfirmPassword("");
      } else if (error.code === 'auth/network-request-failed') {
        setLoginError("Network error. This is often caused by ad blockers or browser privacy settings. Please disable them or use Google Sign In.");
      } else {
        setLoginError(error.message || "Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    setLoginError("");
    setVerificationMessage("");
    try {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        const { sendEmailVerification } = await import("firebase/auth");
        await sendEmailVerification(auth.currentUser);
        setVerificationMessage("Verification email resent! Please check your inbox.");
      } else {
        setLoginError("Please log in with your password first to resend the verification email.");
        setShowVerificationScreen(false);
        setAuthMode('signin');
      }
    } catch (error: any) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationLogin = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          window.location.reload();
        } else {
          await signOut(auth);
          setShowVerificationScreen(false);
          setAuthMode('signin');
        }
      } else {
        setShowVerificationScreen(false);
        setAuthMode('signin');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!isAuthReady || isAdminChecking) {
    return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">Loading...</div>;
  }

  if (showVerificationScreen) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-bg-card border border-white/10 rounded-3xl p-8 shadow-2xl text-center relative">
          <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-accent-blue" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Verify Your Email</h2>
          
          {verificationMessage && (
            <div className="mb-6 p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm">
              {verificationMessage}
            </div>
          )}
          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {loginError}
            </div>
          )}

          <p className="text-white/70 mb-8 leading-relaxed">
            We have sent you a verification email to <span className="text-white font-semibold">{unverifiedEmail}</span>. check your inbox or spam, Please verify it and log in.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleVerificationLogin}
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Checking..." : "Login"}
            </button>
            <button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Resend Verification Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-white px-4">
        <div className="w-full max-w-md bg-bg-card border border-white/10 rounded-3xl p-8 shadow-2xl relative">
          <a 
            href="/" 
            className="absolute top-6 left-6 text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </a>
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-bold text-white mb-2">
              {authMode === "reset" ? "Reset Password" : "Admin Access"}
            </h1>
            <p className="text-white/60">
              {user && !isAdmin 
                ? "You do not have permission to access the admin dashboard." 
                : (authMode === "signin" ? "Sign in to manage your blog content." : authMode === "signup" ? "Create an account to access the admin panel." : "Enter your email to receive a password reset link.")}
            </p>
          </div>

          {verificationMessage && (
            <div className="mb-6 p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm">
              {verificationMessage}
            </div>
          )}

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {loginError}
            </div>
          )}

          {user && !isAdmin ? (
            <button 
              onClick={handleLogout}
              className="w-full px-6 py-3 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <>
              <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-blue transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            
            {authMode !== "reset" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-white/70">Password</label>
                  {authMode === "signin" && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("reset");
                        setLoginError("");
                        setVerificationMessage("");
                      }}
                      className="text-xs text-accent-blue hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-blue transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
            
            {authMode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-blue transition-colors pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Processing..." : (authMode === "signin" ? "Sign In" : authMode === "signup" ? "Sign Up" : "Reset Password")}
            </button>
            
            {authMode === "reset" && (
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signin");
                  setLoginError("");
                  setVerificationMessage("");
                }}
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Back to Login
              </button>
            )}
          </form>

          {authMode !== "reset" && (
            <>
              <div className="relative flex items-center py-2 mb-6">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-white/40 text-sm">or</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                type="button"
                className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === "signin" ? "signup" : "signin");
                    setLoginError("");
                  }}
                  className="text-sm text-accent-blue hover:underline"
                >
                  {authMode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </>
          )}
            </>
          )}
        </div>
      </div>
    );
  }

  const renderView = () => {
    if (currentView.startsWith('edit:')) {
      const articleId = currentView.split(':')[1];
      return <EditArticle articleId={articleId} setView={setCurrentView} />;
    }

    switch (currentView) {
      case 'dashboard': return <DashboardHome setView={setCurrentView} />;
      case 'generate': return <GenerateArticle user={user} setView={setCurrentView} />;
      case 'bulk': return <BulkGenerate user={user} setView={setCurrentView} />;
      case 'all': return <AllArticles setView={setCurrentView} searchQuery={searchQuery} />;
      case 'drafts': return <AllArticles setView={setCurrentView} filterStatus="draft" searchQuery={searchQuery} />;
      case 'published': return <AllArticles setView={setCurrentView} filterStatus="published" searchQuery={searchQuery} />;
      case 'portfolio': return <PortfolioManager />;
      case 'seo': return <SEOSettings />;
      case 'inquiries': return <InquiriesList />;
      case 'subscribers': return <SubscribersList />;
      case 'team': 
        if (user?.email && ["devabdultechnologies@gmail.com", "aalqutijifawy@gmail.com", "eduverseai76@gmail.com"].includes(user.email.toLowerCase())) {
          return <TeamManagement />;
        }
        return <DashboardHome setView={setCurrentView} />;
      default: return <DashboardHome setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-bg-card border-r border-white/10 flex flex-col fixed h-screen overflow-y-auto scrollbar-hide z-20 transition-all duration-300`}>
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <h2 className="text-xl font-bold text-white flex items-center gap-2 whitespace-nowrap overflow-hidden">
              <span className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                AI
              </span>
              Blog Engine
            </h2>
          )}
          {isSidebarCollapsed && (
            <span className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center text-white font-bold text-sm shrink-0 mx-auto">
              AI
            </span>
          )}
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-x-hidden">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-accent-blue/10 text-accent-blue' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Dashboard"
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => setCurrentView('generate')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'generate' ? 'bg-accent-purple/10 text-accent-purple' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Generate Article"
          >
            <FileText className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Generate Article</span>}
          </button>
          <button 
            onClick={() => setCurrentView('bulk')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'bulk' ? 'bg-accent-orange/10 text-accent-orange' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Bulk Generate"
          >
            <FileText className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Bulk Generate</span>}
          </button>
          
          {!isSidebarCollapsed && <div className="pt-4 pb-2 px-4 text-xs font-bold text-white/40 uppercase tracking-wider">Content</div>}
          {isSidebarCollapsed && <div className="pt-4 pb-2 w-full border-t border-white/10 mt-2"></div>}
          
          <button 
            onClick={() => setCurrentView('all')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'all' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="All Articles"
          >
            <List className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>All Articles</span>}
          </button>
          <button 
            onClick={() => setCurrentView('drafts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'drafts' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Drafts"
          >
            <FileEdit className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Drafts</span>}
          </button>
          <button 
            onClick={() => setCurrentView('published')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'published' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Published"
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Published</span>}
          </button>
          
          <button 
            onClick={() => setCurrentView('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'portfolio' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Portfolio / Case Studies"
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Portfolio</span>}
          </button>
          
          {!isSidebarCollapsed && <div className="pt-4 pb-2 px-4 text-xs font-bold text-white/40 uppercase tracking-wider">Settings</div>}
          {isSidebarCollapsed && <div className="pt-4 pb-2 w-full border-t border-white/10 mt-2"></div>}
          
          <button 
            onClick={() => setCurrentView('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'inquiries' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Inquiries"
          >
            <Mail className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Inquiries</span>}
          </button>
          
          <button 
            onClick={() => setCurrentView('subscribers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'subscribers' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Subscribers"
          >
            <Users className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Subscribers</span>}
          </button>

          <button 
            onClick={() => setCurrentView('seo')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'seo' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="SEO Settings"
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>SEO Settings</span>}
          </button>
          
          {user?.email && ["devabdultechnologies@gmail.com", "aalqutijifawy@gmail.com", "eduverseai76@gmail.com"].includes(user.email.toLowerCase()) && (
            <button 
              onClick={() => setCurrentView('team')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'team' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
              title="Team Management"
            >
              <Users className="w-5 h-5 shrink-0" />
              {!isSidebarCollapsed && <span>Team Management</span>}
            </button>
          )}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} flex flex-col min-h-screen transition-all duration-300`}>
        {/* Top Navbar */}
        <header className="h-16 bg-bg-card border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center bg-bg-dark border border-white/10 rounded-full px-4 py-2 w-96">
              <Search className="w-4 h-4 text-white/50 mr-2" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="text-white/70 hover:text-white relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-blue text-[10px] font-bold flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-bg-card border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-thin">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-white/50 text-sm">
                        No notifications yet
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${!notif.read ? 'bg-white/[0.02]' : ''}`}
                            onClick={() => {
                              if (!notif.read) markAsRead(notif.id);
                            }}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm ${!notif.read ? 'font-bold text-white' : 'font-medium text-white/80'}`}>
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-accent-blue rounded-full mt-1.5 flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-xs text-white/60 line-clamp-2 mb-2">{notif.message}</p>
                            <span className="text-[10px] text-white/40">
                              {notif.createdAt ? (() => {
                                const date = notif.createdAt.toDate();
                                const now = new Date();
                                const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
                                
                                if (diffInSeconds < 60) return 'Just now';
                                if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
                                if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
                                return `${Math.floor(diffInSeconds / 86400)} days ago`;
                              })() : 'Unknown time'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <p className="text-white font-medium leading-none">{user.displayName || 'Admin User'}</p>
                <p className="text-white/50 text-xs mt-1">{user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 p-8 overflow-y-auto scrollbar-thin">
          <div className="max-w-6xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
