// ============ EMAILJS ============
(function () {
    emailjs.init("0iP2L2hOPcBbc7vmC");
})();

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const original = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        const serviceID = 'service_0kx931g';
        const notifID   = 'template_h0no3vd';
        const replyID   = 'template_3i3n2nb';

        emailjs.sendForm(serviceID, notifID, this)
            .then(() => {
                emailjs.sendForm(serviceID, replyID, this);
                btn.innerText = '✓ Message Sent!';
                alert('Message sent! You\'ll receive a confirmation shortly.');
                this.reset();
                setTimeout(() => { btn.innerText = original; btn.disabled = false; }, 3500);
            })
            .catch((err) => {
                btn.innerText = original;
                btn.disabled = false;
                alert('Something went wrong. Please try again.');
                console.error(err);
            });
    });
}

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close on outside tap (mobile)
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ COUNTER ANIMATION ============
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            let current = 0;
            const steps = 35;
            const increment = Math.ceil(target / steps);
            const timer = setInterval(() => {
                current = Math.min(current + increment, target);
                el.textContent = current;
                if (current >= target) clearInterval(timer);
            }, 40);
        });
        counterObserver.unobserve(entry.target);
    });
}, { threshold: 0.4 });

const statsEl = document.querySelector('.stats-strip');
if (statsEl) counterObserver.observe(statsEl);

// ============ TYPING ANIMATION ============
const roles = [
    "RAG Pipelines",
    "Explainable AI Systems",
    "LLM Evaluation Frameworks",
    "Agentic AI Workflows",
    "Production-Ready GenAI"
];

let roleIndex = 0;
let charIndex  = 0;
let deleting   = false;
const typedEl  = document.getElementById('typed-text');

function type() {
    if (!typedEl) return;
    const word = roles[roleIndex];
    typedEl.textContent = deleting
        ? word.substring(0, charIndex - 1)
        : word.substring(0, charIndex + 1);

    deleting ? charIndex-- : charIndex++;

    let delay = deleting ? 45 : 85;
    if (!deleting && charIndex === word.length) { delay = 1800; deleting = true; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }

    setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 900));
