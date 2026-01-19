// Get navigation elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu when hamburger icon is clicked
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when any navigation link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


/* CONTACT FORM - WHATSAPP INTEGRATION */

const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', (e) => {
   
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const whatsappMessage = `Hello, I'm ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;

    const whatsappNumber = '8801858656473';

    // Open WhatsApp in new tab with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    // Clear the form after submission
    contactForm.reset();
});


/* PASSWORD PROTECTED DOCUMENT ACCESS */

document.querySelectorAll('.view-doc-btn').forEach(button => {
    button.addEventListener('click', (e) => {
       
        const secretPassword = "123456"; 
        
        const driveLink = "https://drive.google.com/file/d/19nt9XJIG6wRbClHex0erzX5zPwg7WRku/view?usp=sharing";

        const userInput = prompt("This document is restricted. Please enter the access password:");

        if (userInput === null) {
            return;
        }

        if (userInput === secretPassword) {
            alert("Access Granted. Opening document...");
            window.open(driveLink, '_blank');
        } else {
            alert("Incorrect password. Access Denied.");
            console.warn("Unauthorized access attempt detected.");
        }
    });
});


// Enable smooth scrolling when clicking navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ACTIVE NAVIGATION HIGHLIGHT ON SCROLL*/

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Highlight the active navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

