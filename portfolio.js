/**
 * PORTFOLIO CORE LOGIC
 * Features: AOS, Custom Cursor, Smooth Scroll, Typing Effect, 
 * Form Submission, and Skill Animations.
 */

// 1. Initialize Animate on Scroll
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 2. Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const interactables = document.querySelectorAll("a, button, .nav-item, .resume-btn");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct follow for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smooth delay follow for the outline using animate API
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor "Grow" Effect on hover
interactables.forEach(el => {
    el.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-grow"));
    el.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-grow"));
});

// 3. Navbar Scroll & Blur Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.padding = '0.8rem 8%';
        nav.style.background = 'rgba(3, 7, 18, 0.95)';
    } else {
        nav.style.padding = '1.2rem 8%';
        nav.style.background = 'rgba(10, 17, 24, 0.8)';
    }
});

// 4. Typing Effect for Hero Title
const typingElement = document.querySelector('.role-title');
if (typingElement) {
    const text = typingElement.innerText;
    typingElement.innerText = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    // Start typing after initial AOS animation
    setTimeout(typeWriter, 1200);
}

// 5. Skill Bars Intersection Observer
const observerOptions = { threshold: 0.2 };

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                // Get the width from the inline style we set in HTML
                const targetWidth = bar.style.width;
                bar.style.width = '0'; // Start at 0
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.style.opacity = "1";
                    bar.style.transition = "width 1.5s ease-in-out";
                }, 100);
            });
            skillObserver.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) skillObserver.observe(skillsSection);

// 6. Contact Form Logic (Formspree)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        // Visual feedback for sending
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        const formId = 'YOUR_FORM_ID'; // Replace with your Formspree ID
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert("Error: Something went wrong.");
            }
        } catch (error) {
            alert("Connection error. Please try again.");
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// 7. Console Greeting
console.log("%c Portfolio Built by Bhura Dharmesh ", "color: #10b981; font-weight: bold; font-size: 15px;");