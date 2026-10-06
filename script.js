// ===== Mobile nav toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Animated stat counters =====
const stats = document.querySelectorAll('.stat-card h3');
let countedOnce = false;
function animateStats() {
  stats.forEach(el => {
    const target = +el.getAttribute('data-count');
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = count;
    }, 25);
  });
}
const aboutSection = document.getElementById('about');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countedOnce) { animateStats(); countedOnce = true; }
  });
}, { threshold: 0.4 });
if (aboutSection) statsObserver.observe(aboutSection);

// ===== Skill bars animate on scroll =====
const bars = document.querySelectorAll('.bar div');
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      bars.forEach(bar => { bar.style.width = bar.style.width; });
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== Project filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

// ===== Testimonial slider =====
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('testimonial-dots');
let currentTestimonial = 0;

testimonials.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showTestimonial(i));
  dotsContainer.appendChild(dot);
});

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dotsContainer.querySelectorAll('span').forEach(d => d.classList.remove('active'));
  testimonials[index].classList.add('active');
  dotsContainer.querySelectorAll('span')[index].classList.add('active');
  currentTestimonial = index;
}

setInterval(() => {
  const next = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(next);
}, 5000);

// ===== Contact form (powered by Formspree - free forever tier) =====
// Sign up at https://formspree.io (free), create a form, and replace
// YOUR_FORM_ID below with the ID from your Formspree form endpoint.
const FORMSPREE_ENDPOINT = "https://formspree.io/xkjoowqn";

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      status.textContent = "Thanks for reaching out! I'll get back to you soon.";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Please email me directly.";
    }
  } catch (err) {
    status.textContent = "Something went wrong. Please email me directly.";
  }
});

// ===== Navbar shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 2px 15px rgba(0,0,0,0.12)'
    : '0 2px 10px rgba(0,0,0,0.06)';
});
