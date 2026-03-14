// ============ EMAILJS INIT ============
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// ============ CONTACT FORM ============
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    const serviceID = 'service_0kx931g';
    const notificationTemplateID = 'template_h0no3vd';
    const autoReplyTemplateID = 'template_3i3n2nb';

    emailjs.sendForm(serviceID, notificationTemplateID, this)
        .then(() => {
            emailjs.sendForm(serviceID, autoReplyTemplateID, this);
            btn.innerText = '✓ Sent!';
            alert('Message sent! Check your inbox for a confirmation.');
            this.reset();
            setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 3000);
        }, (err) => {
            btn.innerText = originalText;
            btn.disabled = false;
            alert('Failed to send. Please try again.');
            console.error('EmailJS Error:', err);
        });
});

// ============ NAVBAR SHRINK ON SCROLL ============
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ COUNTER ANIMATION (Stats Strip) ============
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 40);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) counterObserver.observe(statsStrip);

// ============ TYPING ANIMATION (Hero) ============
const roles = [
    "RAG Pipelines",
    "Explainable AI Systems",
    "LLM Evaluation Frameworks",
    "Agentic AI Workflows",
    "Production-Ready GenAI"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeLoop, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeLoop, 800);
});
