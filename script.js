'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); 
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////////
// const message = document.createElement("div");
// const header = document.body.querySelector("header");

// message.classList.add("cookie-message");
// message.innerHTML = 'This is cookie message <button class="cookie-message btn">Get cookie</button>'

// header.append(message);
// header.prepend(message);
// header.before(message.cloneNode(true))
// header.after(message);

// document
// .querySelector(".cookie-message")
// .addEventListener('click', function(){
//   message.remove();
// })

// document.body.style.setProperty("--color-primary", "Red")

const btnToScroll =document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnToScroll.addEventListener('click', function(e){
const s1coords =   section1.getBoundingClientRect();
console.log(s1coords);
// window.scrollTo({
//   left: s1coords.left + window.pageXOffset, 
//   top:s1coords.top + window.pageYOffset,
//   behavior: 'smooth'
//  })

 section1.scrollIntoView({behavior:'smooth'})
})

// document.querySelector('h1').onmouseenter= function(e){
//   alert("onmoiseenter");
// }
const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));


document.querySelectorAll('.nav__link').forEach(
  function(el){
    el.addEventListener('click',function(e){
      e.preventDefault();
      if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
          behavior:'smooth'
        })
      }
    })
  }
)

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', ()=>{
//   console.log('tab');
// }))

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
})


//Menu fade animation
const nav = document.querySelector('.nav');

const handelHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
     if(el !== link) el.style.opacity = this; //this => 0.5 or 1
    });
    logo.style.opacity = this;
 }
}
nav.addEventListener('mouseover', handelHover.bind(0.5))
nav.addEventListener('mouseout', handelHover.bind(1))


//sticky navigation
// const obsClassback = function(entries, observer){
//   entries.forEach(entry=> {
//     console.log(entry)
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold:[0, 0.2]
// };

// const observer = new IntersectionObserver(obsClassback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const[entry] = entries;
  if(!entry.isIntersecting)
  nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold:0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


//reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});



//lazy loading Images
const imgTargers = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  //replacing src with data-src
  entry.target.src= entry.target.dataset.src;
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});
imgTargers.forEach(img => imgObserver.observe(img));

//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();