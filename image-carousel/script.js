let currentIndex = 0;
const slides = document.querySelector('.carousel-slides');
const images = slides.querySelectorAll('img');
const dotsContainer = document.querySelector('.dots');

// Create dots
images.forEach((_, idx) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (idx === 0) dot.classList.add('active');
  dot.dataset.index = idx;
  dotsContainer.appendChild(dot);
});

// Change slide function
function changeSlide(index) {
  currentIndex = (index + images.length) % images.length;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  dotsContainer.children[currentIndex].classList.add('active');
}

// Button events
document.querySelector('.prev').addEventListener('click', () => changeSlide(currentIndex - 1));
document.querySelector('.next').addEventListener('click', () => changeSlide(currentIndex + 1));

// Dot navigation
dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dot')) {
    changeSlide(parseInt(e.target.dataset.index));
  }
});

// Auto-slide
setInterval(() => changeSlide(currentIndex + 1), 5000);
