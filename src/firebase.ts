import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';
export { firebaseConfig };

// Initialize Firebase SDK
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
// @ts-ignore - Handle missing firestoreDatabaseId in user config
const firestoreDatabaseId = (firebaseConfig as any).firestoreDatabaseId;
export const db = firestoreDatabaseId 
  ? getFirestore(app, firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Set persistence
setPersistence(auth, browserSessionPersistence).catch(console.error);
