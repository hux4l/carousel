const track = document.querySelector(".carousel__track");
let slides = document.querySelectorAll(".carousel__slide");
const slide = document.querySelector(".carousel__slide");
const btnNext = document.querySelector(".carousel__button--right");
const btnPrev = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const interval = 3000;

// set current index
let index = 1;
let slideId;

// clone first and last slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// add id to first and last slide
firstClone.id = "first-clone";
lastClone.id = "last-clone";

// add last to beginning, first to end
track.append(firstClone);
track.prepend(lastClone);

/// create button for navigation dot
const navDot = function (id) {
  let btn = document.createElement("button");
  btn.classList.add("carousel__indicator");
  btn.id = "dot";
  btn.dataset.id = +id;
  return btn;
};

// get width of slide
const slideWidth = slides[index].clientWidth;

// move slides one left, so the first one is hidden
track.style.transform = `translateX(${-slideWidth * index}px)`;

// timer to start slide
const startSlide = () => {
  slideId = setInterval(() => {
    nextSlide();
  }, interval);
};

// function to get nev slides array
const getSlides = () => document.querySelectorAll(".carousel__slide");

// navigation dots
let navDots = [];
createNavDots();
navDots = document.querySelectorAll(".carousel__indicator");

// on ond of the transition go to beginning
track.addEventListener("transitionend", () => {
  slides = getSlides();
  // if we are on end, switch to beginning
  if (slides[index].id === firstClone.id) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  // if we are on beginning switch to end
  if (slides[index].id === lastClone.id) {
    track.style.transition = "none";
    index = slides.length - 2;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

// if we get mouse in the container stops the timer
track.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

// if we leave container starts timer again
track.addEventListener("mouseleave", startSlide);

// next slide, if we are on end do nothing
// otherwise translate slides
const nextSlide = () => {
  slides = getSlides();
  console.log(index);
  if (index === 1) navDots[index - 1].classList.add("current-slide");
  if (index > 0 && index < slides.length - 2)
    navDots[index - 1].classList.remove("current-slide");
  else {
    navDots[index - 3].classList.remove("current-slide");
  }
  index++;
  if (index > 0 && index < slides.length - 1) {
    navDots[index - 1].classList.add("current-slide");
  } else {
    navDots[index - 2].classList.remove("current-slide");
  }
  if (index === slides.length - 1) navDots[0].classList.add("current-slide");

  track.style.transform = `translateX(${-slideWidth * index}px)`;
  track.style.transition = "0.7s";
};

// previous slide, if we are on beginning do nothing
const prevSlide = () => {
  slides = getSlides();
  if (index <= 0) return;
  if (index > 0 && index < slides.length - 1)
    navDots[index - 1].classList.remove("current-slide");
  else {
    navDots[index].classList.add("current-slide");
  }
  console.log(index);
  index--;
  console.log(index);
  if (index > 0 && index < slides.length - 2) {
    navDots[index - 1].classList.add("current-slide");
  } else {
    navDots[slides.length - 3].classList.add("current-slide");
  }

  track.style.transform = `translateX(${-slideWidth * index}px)`;
  track.style.transition = "0.7s";
};

// listeners to next and prev buttons
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// stop and restart timer each time we click buttons
btnNext.addEventListener("mouseover", () => clearInterval(slideId));
btnPrev.addEventListener("mouseover", () => clearInterval(slideId));
btnNext.addEventListener("mouseleave", startSlide);
btnPrev.addEventListener("mouseleave", startSlide);

function createNavDots() {
  for (let i = 1; i < getSlides().length - 2; i++) {
    navDots.push(navDot(i));
  }
  for (let dot of navDots) {
    dotsNav.append(dot);
  }
}

startSlide();

// change slide on dot click
dotsNav.addEventListener("click", function (e) {
  clearInterval(slideId);
  // if clicked something else do nothing
  if (e.target.id !== "dot") return;

  // get dot id from data attribute
  const dotId = +e.target.dataset.id;
  // change without transition
  track.style.transition = "0.7s";
  // set all dots as not active
  for (let dot of navDots) dot.classList.remove("current-slide");
  // change index to current selected slide
  index = dotId + 1;
  // select clicked dot as current-slide
  navDots[dotId].classList.add("current-slide");
  // start transform from selected slide
  track.style.transform = `translateX(${-slideWidth * index}px)`;
  startSlide();
});
