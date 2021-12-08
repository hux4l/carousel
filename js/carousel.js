const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const btnNext = document.querySelector(".carousel__button--right");
const btnPrev = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides nex to each
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// function to move style
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// dots change
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// arrows hidding
const hideShowArrows = (slides, btnPrev, btnNext, target) => {
  // arrows dissapearing
  if (target === 0) {
    btnPrev.classList.add("is-hidden");
    btnNext.classList.remove("is-hidden");
  } else if (target === slides.length - 1) {
    btnPrev.classList.remove("is-hidden");
    btnNext.classList.add("is-hidden");
  } else {
    btnPrev.classList.remove("is-hidden");
    btnNext.classList.remove("is-hidden");
  }
};

// move slides left
btnPrev.addEventListener("click", (e) => {
  // check current slide
  const currentSlide = track.querySelector(".current-slide");
  //check next slide
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, btnPrev, btnNext, prevIndex);
});

// move slides right
btnNext.addEventListener("click", (e) => {
  // check current slide
  const currentSlide = track.querySelector(".current-slide");
  //check next slide
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, btnPrev, btnNext, nextIndex);
});

// on nav move to selected slide
dotsNav.addEventListener("click", (e) => {
  // select only clicked dot
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  hideShowArrows(slides, btnPrev, btnNext, targetIndex);
});
