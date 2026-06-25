import React from 'react';
import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, firebaseConfig } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";
import { UserPlus, Trash2, Shield, User as UserIcon, FileText, Power, Key } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SUPER_ADMINS = [
  "devabdultechnologies@gmail.com",
  "aalqutijifawy@gmail.com"
];

interface TeamMember {
  id: string;
  email: string;
  role: string;
  status?: string;
  createdAt: any;
}

export function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("editor");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const usersRef = collection(db, "team_members");
      const snapshot = await getDocs(usersRef);
      const membersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeamMember[];
      setMembers(membersData);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, "team_members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError("");
    setSuccess("");

    try {
      // Add user to Firestore team_members collection using email as ID
      await setDoc(doc(db, "team_members", newEmail.toLowerCase()), {
        email: newEmail.toLowerCase(),
        role: newRole,
        status: 'active',
        createdAt: serverTimestamp()
      });

      setSuccess(`Successfully invited ${newEmail} as ${newRole}. They can now sign in to access the dashboard.`);
      setTimeout(() => setSuccess(""), 5000);
      setNewEmail("");
      await fetchMembers();
    } catch (error: any) {
      console.error("Error adding team member:", error);
      setError(error.message || "Failed to add team member");
      setTimeout(() => setError(""), 5000);
      handleFirestoreError(error, OperationType.CREATE, `team_members/${newEmail.toLowerCase()}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveMember = async (id: string, email: string) => {
    if (SUPER_ADMINS.includes(email.toLowerCase())) {
      setError("Cannot remove a super admin.");
      return;
    }
    
    try {
      await deleteDoc(doc(db, "team_members", id));
      setSuccess(`Removed ${email} from the team.`);
      setTimeout(() => setSuccess(""), 3000);
      fetchMembers();
    } catch (error: any) {
      setError(error.message || "Failed to remove member.");
      handleFirestoreError(error, OperationType.DELETE, `team_members/${id}`);
    }
  };

  const handleToggleStatus = async (id: string, email: string, currentStatus: string | undefined) => {
    if (SUPER_ADMINS.includes(email.toLowerCase())) {
      setError("Cannot change status of a super admin.");
      return;
    }
    try {
      const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
      await updateDoc(doc(db, "team_members", id), { status: newStatus });
      fetchMembers();
    } catch (error: any) {
      setError(error.message || "Failed to update member status.");
      handleFirestoreError(error, OperationType.UPDATE, `team_members/${id}`);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading team members...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
          <p className="text-white/60">Manage dashboard access for your team members.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Member Form */}
        <div className="lg:col-span-1">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-accent-blue" />
              Add New Member
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors"
                  placeholder="colleague@example.com"
                />
                <p className="text-xs text-white/40 mt-2">
                  The user can sign in using Google or create an account with this email.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors appearance-none"
                >
                  <option value="editor">Editor (Can write/edit posts)</option>
                  <option value="admin">Admin (Full access)</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isAdding}
                className="w-full py-3 mt-2 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isAdding ? "Inviting..." : "Invite Team Member"}
              </button>
            </form>
          </div>
        </div>

        {/* Team Members List */}
        <div className="lg:col-span-2">
          <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Current Team Members</h2>
            </div>
            
            <div className="divide-y divide-white/10">
              {members.length === 0 ? (
                <div className="p-8 text-center text-white/50">
                  No team members found.
                </div>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {member.role === 'admin' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-orange/20 text-accent-orange text-xs font-medium">
                              <Shield className="w-3 h-3" /> Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent-blue/20 text-accent-blue text-xs font-medium">
                              <FileText className="w-3 h-3" /> Editor
                            </span>
                          )}
                          {member.status === 'inactive' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/20 text-red-500 text-xs font-medium">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!SUPER_ADMINS.includes(member.email.toLowerCase()) && (
                        <>
                          <button
                            onClick={() => handleToggleStatus(member.id, member.email, member.status)}
                            className={`p-2 rounded-lg transition-colors ${
                              member.status === 'inactive' 
                                ? 'text-white/40 hover:text-green-400 hover:bg-green-400/10' 
                                : 'text-white/40 hover:text-orange-400 hover:bg-orange-400/10'
                            }`}
                            title={member.status === 'inactive' ? "Activate Member" : "Deactivate Member"}
                          >
                            <Power className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveMember(member.id, member.email)}
                            className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            title="Remove Member"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
