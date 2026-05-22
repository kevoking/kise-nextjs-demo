// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAuth, type Auth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const hasRequiredConfig = Boolean(
//   firebaseConfig.apiKey &&
//     firebaseConfig.authDomain &&
//     firebaseConfig.projectId &&
//     firebaseConfig.storageBucket &&
//     firebaseConfig.messagingSenderId &&
//     firebaseConfig.appId,
// );

// const app = hasRequiredConfig ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

// export const auth: Auth | null = typeof window !== "undefined" && app ? getAuth(app) : null;
// export const isFirebaseConfigured = hasRequiredConfig;

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyDvuBtFgP3P97IjXO1d4WLhTm4lJmbt0",
  authDomain: "kyte-ai-5fb64.firebaseapp.com",
  projectId: "kyte-ai-5fb64",
  storageBucket: "kyte-ai-5fb64.firebasestorage.app",
  messagingSenderId: "969405692854",
  appId: "1:969405692854:web:6e0043c6c6f97d04759f17",
  measurementId: "G-ZRCZCSJ15M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth | null = typeof window !== "undefined" && app ? getAuth(app) : null;
export const isFirebaseConfigured = true;