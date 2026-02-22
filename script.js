// 1. Custom Mouse Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Slight delay for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 150, fill: "forwards" });
});

// Enlarge cursor over clickable items
const hoverables = document.querySelectorAll('a, button, .bento-card, .tech-tag');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'var(--text-main)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.borderColor = 'var(--accent)';
    });
});

// 2. Cyber/Terminal Typewriter Effect
const roles = ["Data Analyst", "Hardware Integrator", "Roblox Dev (Luau)", "Data Visualizer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeText = document.getElementById('type-text');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeText.textContent = `> ${currentRole.substring(0, charIndex - 1)}`;
        charIndex--;
    } else {
        typeText.textContent = `> ${currentRole.substring(0, charIndex + 1)}`;
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next word
    }
    setTimeout(typeEffect, typeSpeed);
}
setTimeout(typeEffect, 1000);

// 3. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.fade-in-up');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// 4. Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});