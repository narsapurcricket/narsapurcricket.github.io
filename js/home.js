let currentIndex = 0;
let autoPlay = true;
let timer = null;

const slidesContainer =
document.getElementById("slidesContainer");

const dotsContainer =
document.getElementById("dotsContainer");

function buildDots() {

 const slides =
 document.querySelectorAll(".slide");

 dotsContainer.innerHTML="";

 slides.forEach((_,i)=>{
   const d=document.createElement("span");
   d.className="dot"+(i===0?" active":"");
   d.onclick=()=> goToSlide(i);
   dotsContainer.appendChild(d);
 });

}

function updateSlider() {

 const len =
 document.querySelectorAll(".slide").length;

 if(len===0)return;

 currentIndex =
 (currentIndex+len)%len;

 slidesContainer.style.transform=
 "translateX(-"+currentIndex*100+"%)";

 document.querySelectorAll(".dot")
 .forEach((dot,i)=>{
    dot.classList.toggle("active",
     i===currentIndex);
 });

}

window.nextSlide=function(){
 currentIndex++;
 updateSlider();
};

window.prevSlide=function(){
 currentIndex--;
 updateSlider();
};

window.goToSlide=function(i){
 currentIndex=i;
 updateSlider();
};

window.togglePause=function(){

 autoPlay=!autoPlay;

 document.querySelector(".pause-left")
 .innerText= autoPlay?"⏸":"▶";

 if(!autoPlay) {
   window.clearInterval(timer);
 } else {
   startAutoPlay();
 }

};

function startAutoPlay(){

 if(timer)window.clearInterval(timer);

 timer=window.setInterval(()=>{
   if(autoPlay){
     currentIndex++;
     updateSlider();
   }
 },2500);

}

buildDots();
startAutoPlay();
