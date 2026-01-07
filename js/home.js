// js/home.js
// Narsapur (G) Cricket Association – Static GitHub Image Slider
// Public view + Admin-ready (future enabling)

let currentIndex = 0;
let autoPlay = true;
let timer = null;

// -------- GITHUB IMAGES (EDIT HERE LATER IF NEEDED) --------
const GITHUB_IMAGES = [
  "images/banner1.png",
  "images/home2.png",
  "images/home3.jpeg",
  "images/home4.png",
  "images/home5.jpeg"
];
// ------------------------------------------------------------

const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");
const playBtn = document.getElementById("playPauseBtn");

// -------- RENDER SLIDES FROM GITHUB --------
function renderSlides() {
  slidesContainer.innerHTML = "";

  GITHUB_IMAGES.slice((5).for statements.)

    // Dot creation
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
}

// -------- UPDATE SLIDER POSITION --------
function updateSlider() {
  const len = document.querySelectorAll(".slide").length;
  if (len === 0) return;

  currentIndex = currentIndex % len;

  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });

  playBtn.innerText = autoPlay ? "⏸" : "▶";
}

// -------- AUTO PLAY CONTROL --------
function startAutoPlay() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (autoPlay) nextSlide();
  }, 3000);
}

function clearInterval() {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}

// -------- NEXT / PREVIOUS --------
window.nextSlide = function () {
  currentIndex++;
  updateSlider();
};

window.prevSlide = function () {
  const len = document.querySelectorAll(".slide").length;
  currentIndex = (currentIndex - 1 + len) % len;
  updateSlider();
};

window.goToSlide = function (i) {
  currentIndex = i;
  updateSlider();
};

// -------- PLAY / STOP BUTTON --------
window.togglePlay = function () {
  autoPlay = !autoPlay;
  autoPlay ? startAutoPlay() : clearInterval();
};

window.stopSlides = function () {
  autoPlay = false;
  updateSlider();
  clearInterval();
};

// -------- ADMIN SECTION (FUTURE) --------
window.uploadSlide = function () {
  alert("Admin upload will be enabled later using Firebase Storage.");
};
// ------------------------------------------------------------

// Initial run
renderSlides();
updateSlider();
startAutoPlay();
