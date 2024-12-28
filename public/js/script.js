document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menuItems = document.querySelector('.menu-items');
    
    if (mobileMenuBtn && menuItems) {
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            menuItems.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking links
        menuItems.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                menuItems.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuItems.classList.contains('active') && 
                !menuItems.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                menuItems.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    } else {
        console.log('Menu elements not found'); // Debug log
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Update copyright year
document.getElementById('date').innerHTML = new Date().getFullYear();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.content, .quick-link-item, .footer-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
// Prayer Request Form Handling
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = feedbackForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Replace with your actual form submission logic
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message. We will respond soon.';
            feedbackForm.reset();
            feedbackForm.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Feedback';
        }
    });
}

// Navigation toggle for mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// navToggle.addEventListener('click', () => {
//     navLinks.classList.toggle('nav-active');
// });

// If you have any click handlers on nav links, make sure they don't prevent default behavior
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove this if it exists:
        // e.preventDefault();  
        
        // Just close the mobile menu if open
        navLinks.classList.remove('nav-active');
    });
});