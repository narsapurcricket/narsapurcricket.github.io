import { db, storage } from "./firebase.js";
import "./session.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");
const isAdmin = window.isAdminActive();

if (isAdmin) {
  document.getElementById("adminSliderSection").style.display = "block";
}

let currentIndex = 0;
let autoPlay = true;
let interval;

// ✅ LOAD SLIDES (FIXED)
async function loadSlides() {
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  const q = query(collection(db, "homeSlider"), orderBy("order"));
  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap, index) => {
    const data = docSnap.data();

    const slide = document.createElement("div");
    slide.className = "slide";

    slide.innerHTML = `
      <img src="${data.imageUrl}">
      ${isAdmin ? `
        <button style="
          position:absolute;
          top:15px;
          right:15px;
          background:red;
          color:white;
          border:none;
          padding:6px;
          cursor:pointer;"
          onclick="deleteSlide('${docSnap.id}', '${data.imageUrl}')">
          ✖
        </button>` : ""}
    `;

    slidesContainer.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  updateSlider();
  startAutoPlay();
}

// SLIDER CONTROLS
function updateSlider() {
  slidesContainer.style.transform =
    `translateX(-${currentIndex * 100}%)`;

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

window.nextSlide = () => {
  currentIndex = (currentIndex + 1) %
    document.querySelectorAll(".slide").length;
  updateSlider();
};

window.prevSlide = () => {
  currentIndex =
    (currentIndex - 1 + document.querySelectorAll(".slide").length) %
    document.querySelectorAll(".slide").length;
  updateSlider();
};

window.goToSlide = (i) => {
  currentIndex = i;
  updateSlider();
};

window.togglePlay = () => {
  autoPlay = !autoPlay;
  document.getElementById("playPauseBtn").innerText =
    autoPlay ? "⏸" : "▶";
};

// AUTO PLAY
function startAutoPlay() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (autoPlay) nextSlide();
  }, 4000);
}

// ADMIN UPLOAD
window.uploadSlide = async function () {
  const file = document.getElementById("sliderImage").files[0];
  if (!file) return alert("Select an image");

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    alert("Only PNG/JPEG allowed");
    return;
  }

  const imgRef = ref(storage, `homeSlider/${Date.now()}_${file.name}`);
  await uploadBytes(imgRef, file);
  const url = await getDownloadURL(imgRef);

  await addDoc(collection(db, "homeSlider"), {
    imageUrl: url,
    order: Date.now()
  });

  loadSlides();
};

// ADMIN DELETE
window.deleteSlide = async function (id, url) {
  if (!confirm("Delete this image?")) return;

  await deleteDoc(doc(db, "homeSlider", id));
  await deleteObject(ref(storage, url));

  loadSlides();
};

// ✅ CALL THE CORRECT FUNCTION
loadSlides();
