// Initialize EmailJS is handled in HTML head
// Handle Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form reload

    const btn = this.querySelector('button');
    btn.innerText = 'Sending...';

    // Send the email using EmailJS
    // REPLACE 'service_id' and 'template_id' with your actual IDs
    emailjs.sendForm('service_0kx931g', 'template_h0no3vd', this)
        .then(() => {
            btn.innerText = 'Sent!';
            alert('Message sent successfully!');
            this.reset(); // Clear form
        }, (err) => {
            btn.innerText = 'Send Message';
            alert('Failed to send. Please try again.');
            console.error('EmailJS Error:', err);
        });
});
// Toggle Mobile Menu
function toggleMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

