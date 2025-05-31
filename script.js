// Typed text animation for home section
const typedText = document.getElementById('typed-text');
const words = ['Tika aulia.', 'Mahasiswa Unmer'];
let wordIndex = 0;
let charIndex = 0;
let typing = true;
const delay = 2000;

function type() {
  if (typing) {
    if (charIndex < words[wordIndex].length) {
      typedText.textContent += words[wordIndex][charIndex];
      charIndex++;
      setTimeout(type, 150);
    } else {
      typing = false;
      setTimeout(type, delay);
    }
  } else {
    if (charIndex > 0) {
      typedText.textContent = typedText.textContent.slice(0, -1);
      charIndex--;
      setTimeout(type, 100);
    } else {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    }
  }
}

function animateSkills() {
  const skillBars = document.querySelectorAll('#skill .skill-bar div');
  const triggerBottom = window.innerHeight * 0.85;
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < triggerBottom) {
      const width = bar.dataset.width;
      bar.style.width = width;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  type();

  animateSkills();
  window.addEventListener('scroll', animateSkills);

  // Theme toggle setup
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  // Load saved theme or default to dark
  let savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });

  // Accessibility: allow toggle with keyboard (space/enter)
  themeToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
});
