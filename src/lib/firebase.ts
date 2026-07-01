import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
};

// More permissive check to allow initialization if at least Project ID and API Key are present
const isConfigValid = !!firebaseConfig.apiKey && !!firebaseConfig.projectId && firebaseConfig.apiKey !== "undefined";

let auth: any = null;
let db: any = null;

if (isConfigValid) {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    if (typeof window === 'undefined') {
      console.log("Firebase initialized on Server for project:", firebaseConfig.projectId);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  if (typeof window !== 'undefined') {
    console.warn("Firebase configuration is missing. Check your environment variables.");
  } else {
    console.warn("Firebase Server-side init skipped: Missing API Key or Project ID.");
  }
}

export { auth, db };
