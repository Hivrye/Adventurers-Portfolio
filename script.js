document.addEventListener('DOMContentLoaded', () => {
    // Animate the progress bar
    const progressBar = document.querySelectorAll('.progress');

    progressBar.forEach(bar => {
      const level = bar.getAttribute('data-label');
      bar.style.width = '0%'; // Start at 0%


      setTimeout(() => {
        bar.style.width = `${level}%`;
      }, 400)
    
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! I will get back to you soon.');
        form.reset();
    });
});
