// js/home.js
// Narsapur (G) Cricket Association – GitHub Static Image Carousel

let currentIndex = 0;
let autoPlay = true;
let timer = null;

// -------- EDIT HERE LATER (IMAGE PATHS) --------
const GITHUB_IMAGES = [
  "images/bannes1.png",
  "images/home2.png",
  "images/home3.jpeg",
  "images/home4.jpeg",
  "images/home5.png"
];
// ----------------------------------------------

const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");
const playPauseBtn = document.getElementById("playPauseBtn");

// -------- RENDER SLIDES --------
function renderSlides() {
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  GITHUB_IMAGES.forEach((url, i) => {
    const slideDiv = document.createElement("div");
    slideDiv.className = "slide";

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Narsapur Cricket Pride";

    slideDiv.appendChild(img);
    slidesContainer.appendChild(slideDiv);

    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);

    dotsContainer.appendChild(dot);
  });
}

// -------- UPDATE SLIDER --------
function updateSlider() {
  const len = document.querySelectorAll(".slide").length;
  if (len === 0) return;

  currentIndex = (currentIndex + len) % len;

  slidesContainer.style.transform =
    "translateX(-" + currentIndex * 100 + "%)";

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });

  playPauseBtn.innerText = autoPlay ? "⏸" : "▶";
}

// -------- AUTO PLAY --------
function startAutoPlay() {
  if (timer) clearInterval(timer);

  timer = window.setInterval(() => {
    if (autoPlay) nextSlide();
  }, 3000);
}

function clearIntervalSlides() {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}

// -------- CONTROLS --------
window.nextSlide = function () {
  currentIndex++;
  updateSlider();
};

window.prevSlide = function () {
  currentIndex--;
  updateSlider();
};

window.goToSlide = function (i) {
  currentIndex = i;
  updateSlider();
};

window.togglePlay = function () {
  autoPlay = !autoPlay;
  autoPlay ? startAutoPlay() : clearIntervalSlides();
};

window.stopSlides = function () {
  autoPlay = false;
  updateSlider();
  clearIntervalSlides();
};

// -------- ADMIN (FUTURE) --------
window.uploadSlide = function () {
  alert("Admin upload kept for later – currently GitHub images only.");
};

// Initial run
renderSlides();
updateSlider();
startAutoPlay();
