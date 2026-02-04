// DOM elements
const body = document.body;
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const primaryNav = document.getElementById('primary-nav');

// Toggle mobile nav using a class on body (better for css control)
function openNav(){
  body.classList.add('nav-open');
  navToggle.setAttribute('aria-expanded','true');
  primaryNav.setAttribute('aria-hidden','false');
}
function closeNav(){
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded','false');
  primaryNav.setAttribute('aria-hidden','true');
}
navToggle.addEventListener('click', ()=>{
  if(body.classList.contains('nav-open')) closeNav(); else openNav();
});
navOverlay.addEventListener('click', closeNav);
// Close nav on link click (mobile)
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click', ()=>closeNav()));

// Insert current year in footer
const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

// Simple contact form handler with nicer messaging
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    if(!name || !email){
      formMessage.textContent = 'Please provide your name and email.';
      return;
    }
    // Simulate send
    formMessage.textContent = 'Thanks! We’ll get back to you within 2 business days.';
    form.reset();
  });
}

// Reveal on scroll for elements with class .reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.15});
reveals.forEach(r=>obs.observe(r));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});