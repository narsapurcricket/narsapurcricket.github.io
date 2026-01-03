// Import Firebase SDKs (DO NOT CHANGE THESE URLs)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

// Your Firebase configuration
// (Values must be copied from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyC2T-HOpaK1QYzS5zGSKts9KlJ0kTD-DDQ",
  authDomain: "narsapur-cricket.firebaseapp.com",
  projectId: "narsapur-cricket",
  storageBucket: "narsapur-cricket.firebasestorage.app",
  messagingSenderId: "1088728125576",
  appId: "1:1088728125576:web:172a1bb40178514e620f3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so other JS files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

