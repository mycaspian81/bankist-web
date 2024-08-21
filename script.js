'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const closeCookie = document.querySelector('.btn--close-cookie');
const btnScrolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const initialCoords = section1.getBoundingClientRect();
const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// creat and delet element

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

// header.before(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// // smooth scroll
// // btnScrolTo.addEventListener('click', function (e) {
// //   section1.scrollIntoView({ behavior: 'smooth' });
// // });

navLinks.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(elm => {
    elm.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');
  // tabsContent.forEach(function (element) {
  //   element.classList.remove('operations__content--active');
  // });

  // document
  //   .querySelector(`operations__content--${clicked.dataset.tab}`)
  //   .classList.add('operations__content--active');

  // tabContent.classList.add('operations__content--active');
  // console.log(tabContent);
});

////////////// fade nav links ////////////////

const handleHover = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = document.querySelector('.nav__logo');
    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

////////////////////////// sticky nav //////////////////////////////

// const initialCoord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

////////////////////////// observer //////////////////////////////
const navHeight = nav.getBoundingClientRect().height;
const headerFunc = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObsever = new IntersectionObserver(headerFunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObsever.observe(header);

////////////////////////// observer //////////////////////////

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

////////////////////////// lazy load images //////////////////////////

const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, obsever) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
  rootMargin: '200px',
});

imgTarget.forEach(function (img) {
  imgObserver.observe(img);
});

////////////////////////// slider //////////////////////////
let curSlide = 0;
const maxSlide = slides.length;
// slider.style.overflow = `visible`;
// slider.style.transform = `scale(0.3) translateX(-1500px)`;

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

////////////////////////// creat dots //////////////////////////
const creatDots = function () {
  slides.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
creatDots();

////////////////////////// avtive dots //////////////////////////
const dots = document.querySelectorAll('.dots__dot');
const activeDot = function (slide) {
  dots.forEach(el => {
    el.classList.remove('dots__dot--active');
  });
  console.log(dots);
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activeDot(0);

////////////////////////// change slides //////////////////////////
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const nextSlide = function () {
  if (curSlide == maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activeDot(curSlide);
};
const lastSlide = function () {
  if (curSlide == 0) curSlide = maxSlide - 1;
  else curSlide--;

  goToSlide(curSlide);
  activeDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', lastSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') lastSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const s = Number(e.target.dataset.slide);
    goToSlide(s);
    activeDot(s);
  }
});

////////////////////////////////////////////////////////////////////////
//   const tabContent = document.querySelector(
//     `.operations__content--${clicked.getAttribute('data-tab')}`
//   );
//   tabsContent.forEach(function (e) {
//     e.classList.remove('operations__content--active');
//   });
//   tabContent.classList.add('operations__content--active');

// navLinks.addEventListener('click', e => {
//   e.preventDefault();

//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.target.style.backgroundColor = randomColor();
// });

// const randomInt = (min, max) => {
//   return Math.trunc(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// tabs.forEach(function (el) {
//   eltabsContainer = document.querySelector().addEventListener('click', e => {
//     e.preventDefault();
//     el.classList.add('operations__tab--active');
//     [...el.parentElement.children].forEach(elm => {
//       if (elm !== el) elm.classList.remove('operations__tab--active');
//     });
//   });
// });

// tabsContainer.addEventListener('click', e => {
//   const clicked = e.target.closest('.operations__tab');
//   // Guard Clause
//   if (!clicked) return;

//   tabs.forEach(e => e.classList.remove('operations__tab--active'));
//   clicked.classList.add('operations__tab--active');

//   // Set Content
//   const tabContent = document.querySelector(
//     `.operations__content--${clicked.getAttribute('data-tab')}`
//   );
//   tabsContent.forEach(function (e) {
//     e.classList.remove('operations__content--active');
//   });
//   tabContent.classList.add('operations__content--active');
// });

// window.addEventListener('scroll', () => {
//   console.log(section1.getBoundingClientRect());
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   if (window.scrollY <= initialCoords.top) nav.classList.remove('sticky');
// });

// const obsCallBack = function (entries, observer) {
//   console.log(entries, observer);
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);
