const nav = document.querySelector('.grid-navbar');
const link = document.querySelector('.nav-link');
const section1 = document.querySelector('#section-1');
const img = document.querySelectorAll('.anim');
const navItems = document.querySelector('.nav-items');

const sections = document.querySelectorAll('[data-section]');

// create nav

const names = [
  { key: 'Home' },
  { key: 'Idea' },
  { key: 'How To Start' },
  { key: 'Contact' },
];

sections.forEach((section, i) => {
  const li = document.createElement('li');
  const anchorTag = document.createElement('a');
  const linkTextAchorTag = `#section-${i}`;

  anchorTag.setAttribute('href', linkTextAchorTag);
  anchorTag.classList.add('nav-link');
  // names.map((name) => (anchorTag.textContent = `${name.key}`));

  anchorTag.textContent = names[i].key;

  if (anchorTag.textContent.includes('Home')) {
    anchorTag.classList.add('active');
  }

  li.append(anchorTag);
  li.classList.add('nav-item');

  navItems.append(li);
  console.log(navItems);
});

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

const navObsOptions = {
  threshold: 0.45,
  rootMargin: '-90px',
};

const navObserver = new IntersectionObserver((entries) => {
  const [entry] = entries;
  console.log(entry, 'nav');

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}, navObsOptions);
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

const options = {
  threshold: 0.6,
};

const changeNav = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
      console.log(entry.target);
      document.querySelector('.active').classList.remove('active');

      const id = entry.target.getAttribute('id');

      document.querySelector(`[href="#${id}"]`).classList.add('active');
    }
  });
};

const sectionObserver = new IntersectionObserver(changeNav, options);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
