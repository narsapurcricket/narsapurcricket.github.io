import { db } from "./firebase.js";
import "./session.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const isAdmin = window.isAdminActive();
const teamsContainer = document.getElementById("teamsContainer");

// Show admin section only if admin
if (isAdmin) {
  document.getElementById("adminTeamSection").style.display = "block";
}

// ---------------- LOAD TEAMS ----------------
async function loadTeams() {
  teamsContainer.innerHTML = "";

  const snapshot = await getDocs(collection(db, "teams"));

  snapshot.forEach(teamDoc => {
    const teamId = teamDoc.id;
    const teamName = teamDoc.data().name;

    const teamCard = document.createElement("div");
    teamCard.className = "card";

    teamCard.innerHTML = `
      <h3 style="cursor:pointer;" onclick="togglePlayers('${teamId}')">
        ${teamName}
      </h3>

      <div id="players-${teamId}" style="display:none; margin-top:10px;"></div>

      ${isAdmin ? `
        <button class="danger" onclick="deleteTeam('${teamId}')">
          Delete Team
        </button>
      ` : ""}
    `;

    teamsContainer.appendChild(teamCard);
  });
}

// ---------------- TOGGLE PLAYERS ----------------
window.togglePlayers = async function (teamId) {
  const box = document.getElementById(`players-${teamId}`);

  if (box.style.display === "none") {
    box.style.display = "block";
    await loadPlayers(teamId);
  } else {
    box.style.display = "none";
  }
};

// ---------------- LOAD PLAYERS ----------------
async function loadPlayers(teamId) {
  const box = document.getElementById(`players-${teamId}`);
  box.innerHTML = "<p>Loading players...</p>";

  const snapshot = await getDocs(
    collection(db, "teams", teamId, "players")
  );

  let html = "<ul>";

  snapshot.forEach(playerDoc => {
    const playerName = playerDoc.data().name;

    html += `
      <li>
        ${playerName}
        ${isAdmin ? `
          <button class="danger"
            onclick="deletePlayer('${teamId}','${playerDoc.id}')">
            Delete
          </button>
        ` : ""}
      </li>
    `;
  });

  html += "</ul>";

  // ADMIN: ADD PLAYER
  if (isAdmin) {
    html += `
      <input id="player-${teamId}" placeholder="Player name">
      <button onclick="addPlayer('${teamId}')">Add Player</button>
    `;
  }

  box.innerHTML = html;
}

// ---------------- ADD TEAM (ADMIN) ----------------
window.addTeam = async function () {
  const name = document.getElementById("teamName").value.trim();
  if (!name) return alert("Enter team name");

  await addDoc(collection(db, "teams"), {
    name: name,
    date: new Date()
  });

  document.getElementById("teamName").value = "";
  loadTeams();
};

// ---------------- DELETE TEAM (ADMIN) ----------------
window.deleteTeam = async function (teamId) {
  if (!confirm("Delete this team and all its players?")) return;

  await deleteDoc(doc(db, "teams", teamId));
  loadTeams();
};

// ---------------- ADD PLAYER (ADMIN) ----------------
window.addPlayer = async function (teamId) {
  const input = document.getElementById(`player-${teamId}`);
  const name = input.value.trim();
  if (!name) return alert("Enter player name");

  await addDoc(collection(db, "teams", teamId, "players"), {
    name: name
  });

  input.value = "";
  loadPlayers(teamId);
};

// ---------------- DELETE PLAYER (ADMIN) ----------------
window.deletePlayer = async function (teamId, playerId) {
  if (!confirm("Delete this player?")) return;

  await deleteDoc(
    doc(db, "teams", teamId, "players", playerId)
  );

  loadPlayers(teamId);
};

// Initial load
loadTeams();
