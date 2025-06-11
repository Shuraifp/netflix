// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp8HpnC8fadJHDFQGCdUZ-i4p9XA4SuqA",
  authDomain: "netflix-clone-d993f.firebaseapp.com",
  projectId: "netflix-clone-d993f",
  storageBucket: "netflix-clone-d993f.appspot.com",
  messagingSenderId: "164618482814",
  appId: "1:164618482814:web:78659e6b9b9c76645e942f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
    toast.success("User created successfully");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
}
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logined in successfully");
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
}
const logout = () => {
  signOut(auth);
}

export { auth, db, signup, login, logout }