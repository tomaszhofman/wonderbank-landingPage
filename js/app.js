const nav = document.querySelector('.grid-navbar');
const link = document.querySelector('.nav-link');
const section1 = document.querySelector('#section-1');
const img = document.querySelectorAll('.anim');

nav.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// link.addEventListener('click', function (e) {
//   e.preventDefault();
//   section1.scrollIntoView({ behavior: 'smooth' });

// });

nav.addEventListener('mouseover', function (e) {
  const link = e.target;
  const sibligs = link.closest('.grid-navbar').querySelectorAll('.nav-link');

  sibligs.forEach((el) => {
    if (el !== link) el.style.opacity = 0.5;
  });
});

nav.addEventListener('mouseout', function (e) {
  const link = e.target;
  const sibligs = link.closest('.grid-navbar').querySelectorAll('.nav-link');

  sibligs.forEach((el) => {
    if (el !== link) el.style.opacity = 1;
  });
});

// Intersection observer animations
observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    console.log(el);
    if (el.isIntersecting) {
      el.target.style.animation = `anim1 ${el.target.dataset.delay} forwards ease-out `;
    } else {
      el.target.style.animation = '';
    }
  });
});

img.forEach((img) => {
  observer.observe(img);
});

// Intersection observer sticky nav

navObserver = new IntersectionObserver((entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
});
navObserver.observe(nav);

// Cookie message

const cookieMsg = document.createElement('div');
const span = document.createElement('span');
cookieMsg.textContent =
  'Yes, you guessed it — we’re using cookies. Read our Cookies Policy if you want to know more.';
cookieMsg.classList.add('cookie-message');
span.classList.add('close-btn');

cookieMsg.append(span);
document.body.prepend(cookieMsg);

console.log(cookieMsg);

cookieMsg.addEventListener('click', function () {
  cookieMsg.remove();
});
