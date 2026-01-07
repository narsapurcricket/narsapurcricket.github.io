// js/home.js
// SIMPLE STATIC LOGIC – IMAGES FROM HTML ONLY

let currentIndex = 0;
let autoPlay = true;
let intervalId = null;

const slidesContainer = document.getElementById("slidesContainer");

function slides() {
  return document.querySelectorAll(".slide");
}

function createDots() {

  const box = document.getElementById("dotsContainer");
  box.innerHTML = "";

  const len = slides().length;

  for (let i = 0; i < len; i++) {
    const d = document.createElement("span");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.onclick = () => goToSlide(i);
    box.appendChild(d);
  }

}

function updateSlider() {

  const len = slides().length;
  if (len === 0) return;

  if (currentIndex >= len) currentIndex = 0;
  if (currentIndex < 0) currentIndex = len - 1;

  const offset = -currentIndex * 100;

  slidesContainer.style.transform =
      "translateX(" + offset + "%)";

  document.querySelectorAll(".dot").forEach((dot, i) => {
     if (i === currentIndex)
        dot.classList.add("active");
     else
        dot.classList.remove("active");
  });

}

function startAutoPlay() {

  stopAutoPlay();

  intervalId = setInterval(() => {

    if (!autoPlay) return;

    currentIndex++;
    updateSlider();

  }, 3000);

}

function stopAutoPlay() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function goToSlide(i) {
  currentIndex = i;
  updateSlider();
}

window.togglePause = function () {

  autoPlay = !autoPlay;

  const btn = document.getElementById("sliderPauseBtn");

  if (!autoPlay)
     btn.innerText = "▶";
  else
     btn.innerText = "⏸";

  autoPlay ? startAutoPlay() : stopAutoPlay();

};

// Admin stub – NOT TOUCHED
window.uploadSlide = function () {
  alert("Admin upload kept as it is for later.");
};

window.prevSlide = function () {
  currentIndex--;
  updateSlider();
};

window.nextSlide = function () {
  currentIndex++;
  updateSlider();
};


// INIT ONLY
createDots();
updateSlider();
startAutoPlay();
