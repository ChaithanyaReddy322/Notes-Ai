import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvv4OdyXkBNBjgr8tbfjTscxfZDODcMRI",
  authDomain: "examai-5d5c4.firebaseapp.com",
  projectId: "examai-5d5c4",
  storageBucket: "examai-5d5c4.appspot.com",
  messagingSenderId: "222041265495",
  appId: "1:222041265495:web:9b5a8b3e8aac6942399a12"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default app;