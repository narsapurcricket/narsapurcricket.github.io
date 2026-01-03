import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("isAdmin", "true");
    alert("Admin login successful");
    window.location.href = "index.html";
  } catch {
    alert("Invalid login");
  }
};
