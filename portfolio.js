/**
 * PORTFOLIO CORE LOGIC
 * Features: AOS, Custom Cursor, Smooth Scroll, Typing Effect, 
 * Form Submission, Skill Animations, and Project Modals.
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
const interactables = document.querySelectorAll("a, button, .nav-item, .resume-btn, .skill-card");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

interactables.forEach(el => {
    el.addEventListener("mouseenter", () => cursorOutline?.classList.add("cursor-grow"));
    el.addEventListener("mouseleave", () => cursorOutline?.classList.remove("cursor-grow"));
});

// 3. Navbar Scroll & Blur Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 8%';
            nav.style.background = 'rgba(3, 7, 18, 0.95)';
        } else {
            nav.style.padding = '1.2rem 8%';
            nav.style.background = 'rgba(10, 17, 24, 0.8)';
        }
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
    setTimeout(typeWriter, 1200);
}

// 5. Skill Bars Intersection Observer
const observerOptions = { threshold: 0.2 };

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0'; 
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.style.opacity = "1";
                    bar.style.transition = "width 1.5s ease-in-out";
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) skillObserver.observe(skillsSection);

// 6. Project Modal Logic & Data
const projectDetails = {
    portfolio: {
        title: "Modern Dev Portfolio",
        tech: "HTML5, CSS3 (Glassmorphism), JavaScript",
        description: "A high-performance personal website featuring smooth animations, custom cursor, and SEO optimization to showcase my developer journey.",
        link: "https://github.com/bhura-dharmesh/portfolio"
    },
    ecommerce: {
        title: "E-Commerce Platform",
        tech: "React, Node.js, MongoDB",
        description: "A full-stack shopping application with user authentication, a product catalog, and a secure checkout system.",
        link: "https://github.com/bhura-dharmesh/shop-app"
    },
    weather: {
        title: "Real-time Weather App",
        tech: "JavaScript, OpenWeather API",
        description: "An application that fetches and displays live weather data based on the user's location.",
        link: "https://github.com/bhura-dharmesh/weather-app"
    }
};

function openModal(projectId) {
    const data = projectDetails[projectId];
    const modal = document.getElementById("projectModal");
    const body = document.getElementById("modal-body");

    if (data && modal && body) {
        body.innerHTML = `
            <h2 style="color:var(--accent-teal); margin-bottom:15px; font-family: 'Space Grotesk', sans-serif;">${data.title}</h2>
            <p style="margin-bottom:10px;"><strong>Stack:</strong> ${data.tech}</p>
            <p style="color:var(--text-dim); line-height:1.6;">${data.description}</p>
            <br>
            <a href="${data.link}" target="_blank" class="btn-primary" style="text-decoration:none;">View GitHub</a>
        `;

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }
}

function closeModal() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close modal if user clicks outside of the box
window.addEventListener('click', (event) => {
    const modal = document.getElementById("projectModal");
    if (event.target == modal) {
        closeModal();
    }
});

// 7. Contact Form Logic (Formspree)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = "SENDING...";
        submitBtn.disabled = true;

        const formId = 'dharmeshbhura756@gmail.com'; // Replace with your Formspree ID
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

// 8. Console Greeting
console.log("%c Portfolio Built by Bhura Dharmesh ", "color: #10b981; font-weight: bold; font-size: 15px;");
