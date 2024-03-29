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

// create adn insert
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'we used cookied for improved functionality and analystics. <button class = "btn btn--close-cookie">Got it!</button>';
// header.prepend(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// message.style.width = '120$';
// message.style.backgroundColor = '#37383d';
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
// console.log(message.style.height);

btnScrolTo.addEventListener('click', e => {
  e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(s1coords);
  // console.log(window.pageXOffset, window.pageYOffset);
  // window.scrollTo(
  //   s1coords.keft + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.keft + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// btnScrolTo.onclick = function () {
//   alert('hello');
// };
