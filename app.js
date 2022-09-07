const body = document.querySelector("body");
const sliderContainer = document.querySelector(".sliderContainer")
const slides = document.querySelectorAll(".slider")
const indicators = document.querySelectorAll(".indicator")
const indicatorsArr = Array.from(indicators);
const nextButton = document.querySelector(".nextArrow")
const prevButton = document.querySelector(".prevArrow")
const track = document.querySelector(".track")
const audio = new Audio();

// loading page
const html = body.innerHTML;
body.innerHTML = `<section class="loading_section">
  <div class="loading_parent">
      <img src="gif.gif" alt="" class = "loading_gif">
      <span class="loading_text">Loading</span>
  </div>
</section>`;
const loading_text = document.querySelector(".loading_text");
let dot = 0;
const loading_dots = setInterval(() => {
  if (dot >= 3) {
    loading_text.innerText = loading_text.innerText;
    dot = 0;
  } else {
    loading_text.innerText += ". ";
    dot++;
  }
}, 500);

window.addEventListener("load", () => {
  setTimeout(() => {
    body.innerHTML = html;
    clearInterval(loading_dots);
  }, 2000);
});


const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide,index) => {
  slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition)


const moveToSlide = (currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`
  currentSlide.classList.remove("currentSlide");
  targetSlide.classList.add("currentSlide")
}

const targetingDots = (currentDot, targetDot, targetIndex) => {
  currentDot.classList.remove("currentDot");
  targetDot.classList.add("currentDot");

  if(targetIndex == 0) {
    nextButton.classList.remove("is-hidden")
    prevButton.classList.add("is-hidden")
  } else if(targetIndex == slides.length - 1) {
    nextButton.classList.add("is-hidden")
    prevButton.classList.remove("is-hidden")
  } else {
    nextButton.classList.remove("is-hidden")
    prevButton.classList.remove("is-hidden")
  }
}
nextButton.addEventListener("click", e => {
  const currentSlide = document.querySelector(".currentSlide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = document.querySelector(".currentDot");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = indicatorsArr.findIndex(dot => dot == nextDot)

  moveToSlide(currentSlide, nextSlide)
  targetingDots(currentDot, nextDot, nextIndex);
})

prevButton.addEventListener("click", e => {
  const currentSlide = document.querySelector(".currentSlide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = document.querySelector(".currentDot");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = indicatorsArr.findIndex(dot => dot == prevDot)

  targetingDots(currentDot, prevDot, prevIndex);
  moveToSlide(currentSlide, prevSlide)

})

indicatorsArr.forEach(dot => {
  dot.addEventListener("click", (e) => {
    const targetDot = e.target;
    const currentDot = document.querySelector(".currentDot");
    const currentSlide = document.querySelector(".currentSlide");
    const targetIndex = indicatorsArr.findIndex(dot => dot === targetDot)
    moveToSlide(currentSlide, slides[targetIndex]);

    targetingDots(currentDot, targetDot)

    
  })
})
