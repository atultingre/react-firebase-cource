import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmUZ--P0GyiRNsU8ndDj_xfNlkgbifSyE",
  authDomain: "fir-course-c1d56.firebaseapp.com",
  projectId: "fir-course-c1d56",
  storageBucket: "fir-course-c1d56.appspot.com",
  messagingSenderId: "367411055678",
  appId: "1:367411055678:web:1803f255c8f3d58d1a556f",
  measurementId: "G-MK8245T9ZR",
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
