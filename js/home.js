// Narsapur Cricket - Simple Slider Logic
// Images coming from GitHub /images folder

let currentIndex = 0;
let autoPlay = true;
let intervalId = null;

const slides = document.querySelectorAll(".slide");
const slidesContainer = document.getElementById("slidesContainer");
const dotsContainer = document.getElementById("dotsContainer");


// CREATE DOTS DYNAMICALLY
function createDots() {

  dotsContainer.innerHTML = "";

  for (let i = 0; i < slides.length; i++) {

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => goToSlide(i);

    dotsContainer.appendChild(dot);

  }

  updateDots();

}


// SHOW SLIDE BY INDEX
function showSlide(index) {

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  currentIndex = index;

  const offset = -index * 100;

  slidesContainer.style.transform =
     "translateX(" + offset + "%)";


  updateDots();

}


// UPDATE ACTIVE DOT
function updateDots() {

  const allDots = document.querySelectorAll(".dot");

  allDots.forEach((d, idx) => {

    if (idx === currentIndex)
       d.classList.add("active");
    else
       d.classList.remove("active");

  });

}


// DRILL TO SLIDE
function goToSlide(i) {
  showSlide(i);
}


// AUTO PLAY
function startAutoPlay() {

  stopAutoPlay();

  intervalId = setInterval(() => {

    if (autoPlay)
       showSlide(currentIndex + 1);

  }, 3000);

}


// STOP AUTO PLAY
function stopAutoPlay() {

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

}


// PAUSE TOGGLE – EXPOSE TO UI
window.togglePause = function () {

  autoPlay = !autoPlay;


  const btn =
     document.getElementById("dotPauseBtn");


  if (!autoPlay)
     btn.innerText = "▶";
  else
     btn.innerText = "⏸";

};



// DOT NAV
window.prevSlide = function () {
  showSlide(currentIndex - 1);
};

window.nextSlide = function () {
  showSlide(currentIndex + 1);
};


// ADMIN STUB
window.uploadSlide = function () {
  alert("Admin upload will be enabled later");
};



// INIT
createDots();
startAutoPlay();
