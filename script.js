document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';

    const serviceID = 'service_0kx931g';
    const notificationTemplateID = 'template_h0no3vd'; // Template 1 (To You)
    const autoReplyTemplateID = 'template_3i3n2nb';     // Template 2 (To User)

    // 1. Send Notification to YOU
    emailjs.sendForm(serviceID, notificationTemplateID, this)
        .then(() => {
            // 2. Send Auto-Reply to USER
            // We use sendForm again because it contains the 'user_email' field they entered
            emailjs.sendForm(serviceID, autoReplyTemplateID, this);
            
            // Success UI
            btn.innerText = 'Sent!';
            alert('Message sent successfully! Check your inbox for a confirmation.');
            this.reset();
            setTimeout(() => btn.innerText = originalText, 3000);
        }, (err) => {
            btn.innerText = originalText;
            alert('Failed to send. Please try again.');
            console.error('EmailJS Error:', err);
        });
});
