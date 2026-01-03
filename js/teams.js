import { db } from "./firebase.js";
import { collection, getDocs, addDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const isAdmin = localStorage.getItem("isAdmin") === "true";
if (isAdmin) document.getElementById("adminArea").style.display = "block";

const container = document.getElementById("teams");

async function loadTeams() {
  container.innerHTML = "";
  const snapshot = await getDocs(collection(db, "teams"));
  snapshot.forEach(doc => {
    container.innerHTML += `<div class="card">${doc.data().name}</div>`;
  });
}

window.addTeam = async function () {
  const name = document.getElementById("teamName").value;
  await addDoc(collection(db, "teams"), { name });
  loadTeams();
};

loadTeams();
