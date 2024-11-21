import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPZlUnXeaeXEmnHFAAOwnyJUrKDG574bU",
  authDomain: "auth-2176f.firebaseapp.com",
  projectId: "auth-2176f",
  storageBucket: "auth-2176f.firebase.storage.app",
  messagingSenderId: "820090990850",
  appId: "1:820090990850:web:4e58eff7c0e7422158921b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);