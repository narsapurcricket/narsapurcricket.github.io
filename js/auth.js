import { auth } from "./firebase.js";
import { signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const expiresAt = Date.now() + SESSION_DURATION;

    localStorage.setItem(
      "adminSession",
      JSON.stringify({
        loggedIn: true,
        expiresAt: expiresAt
      })
    );

    alert("Admin login successful (valid for 5 minutes)");
    window.location.href = "index.html";

  } catch (e) {
    alert("Invalid login");
  }
};
