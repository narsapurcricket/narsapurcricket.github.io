import { db, storage } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

import "./session.js";

const isAdmin = window.isAdminActive();
if (isAdmin) {
  document.getElementById("adminSliderSection").style.display = "block";
}

let currentIndex = 0;
let autoPlay = true;
let interval;

const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");

// LOAD SLIDES
async function loadSlides() {
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  const q = query(
    collection(db, "homeSlider"),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc, index) => {
    const imgUrl = doc.data().imageUrl;

    // Slide
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<img src="${imgUrl}">`;
    slidesContainer.appendChild(slide);

    // Dot
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  updateSlider();
  startAutoPlay();
}

// SLIDER FUNCTIONS
function updateSlider() {
  slidesContainer.style.transform =
    `translateX(-${currentIndex * 100}%)`;

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

window.nextSlide = function () {
  currentIndex = (currentIndex + 1) %
    document.querySelectorAll(".slide").length;
  updateSlider();
};

window.prevSlide = function () {
  currentIndex =
    (currentIndex - 1 + document.querySelectorAll(".slide").length) %
    document.querySelectorAll(".slide").length;
  updateSlider();
};

window.goToSlide = function (i) {
  currentIndex = i;
  updateSlider();
};

window.togglePlay = function () {
  autoPlay = !autoPlay;
  document.getElementById("playPauseBtn").innerText =
    autoPlay ? "⏸" : "▶";
  autoPlay ? startAutoPlay() : clearInterval(interval);
};

function startAutoPlay() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (autoPlay) nextSlide();
  }, 4000);
}

// ADMIN UPLOAD
window.uploadSlide = async function () {
  const file = document.getElementById("sliderImage").files[0];
  if (!file) return alert("Select image");

  const count = document.querySelectorAll(".slide").length;
  if (count >= 5) {
    alert("Max 5 images allowed");
    return;
  }

  const imgRef = ref(storage, `homeSlider/${Date.now()}_${file.name}`);
  await uploadBytes(imgRef, file);
  const url = await getDownloadURL(imgRef);

  await addDoc(collection(db, "homeSlider"), {
    imageUrl: url,
    order: count + 1,
    createdAt: new Date()
  });

  loadSlides();
};

loadSlides();
