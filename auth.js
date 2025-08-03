import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBwBuy-gkE9CDZpjA8zVRAteDV4PxCsVBk",
  authDomain: "muhammad-sheikh.firebaseapp.com",
  projectId: "muhammad-sheikh",
  storageBucket: "muhammad-sheikh.firebasestorage.app",
  messagingSenderId: "292369780037",
  appId: "1:292369780037:web:fa0b44444532a6cef5022c",
  measurementId: "G-Y4SJ536K1D",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const signupBtn = document.getElementById("btn");
if (signupBtn) {
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("pass").value.trim();

    if (!email || !password) {8
      Swal.fire("Empty Fields", "Email and Password are required", "warning");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire("Account Created!", `Welcome ${userCredential.user.email}`, "success");
      window.location.href = "./login.html";
    } catch (error) {
      Swal.fire("Signup Failed", error.message, "error");
    }
  });
}

const signinBtn = document.getElementById("lbtn");
if (signinBtn) {
  signinBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email = document.getElementById("lemail").value.trim();
    const password = document.getElementById("lpass").value.trim();

    if (!email || !password) {
      Swal.fire("Empty Fields", "Email and Password are required", "warning");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Logged In!", `Welcome back, ${userCredential.user.email}`, "success");
      window.location.href = "./index.html";
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    }
  });
}

const googleBtn = document.getElementById("google-btn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      Swal.fire("Google Login Success", `Welcome ${user.displayName || user.email}`, "success");
      window.location.href = "./index.html";
    } catch (error) {
      Swal.fire("Google Login Failed", error.message, "error");
    }
  });
}
