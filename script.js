document.addEventListener('DOMContentLoaded', () => {
    // 1. Clean JS fallback initialization
    document.documentElement.classList.remove('no-js');
    document.body.classList.remove('no-js');

    // 2. High-Performance Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Direct immediate update for dot
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // RequestAnimationFrame for smooth outline trailing
        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.2; // Easing multiplier
            outlineY += (mouseY - outlineY) * 0.2;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor morphing on interactive elements
        const hoverables = document.querySelectorAll('a, button, .bento-item, .tech-tag');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
        });
    }

    // 3. Glow Border Coordinates (CSS :hover gradient tracking)
    document.querySelectorAll('.glow-border').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. View Transitions API Theme Toggle (2025 Standard)
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    const toggleThemeDOM = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', newTheme);
    };

    // Initialize saved theme
    if (localStorage.getItem('theme') === 'light') toggleThemeDOM();

    themeBtn.addEventListener('click', () => {
        // Use View Transition API if supported, otherwise instantly toggle
        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            toggleThemeDOM();
            return;
        }
        document.startViewTransition(() => toggleThemeDOM());
    });

    // 5. Terminal Typewriter Effect
    const roles = ["Data Analyst", "Python Developer", "Roblox Dev (Luau)", "Hardware Integrator"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeText = document.getElementById('type-text');

    const typeEffect = () => {
        if (!typeText) return;
        const currentRole = roles[roleIndex];
        
        typeText.textContent = isDeleting 
            ? `> ${currentRole.substring(0, charIndex - 1)}`
            : `> ${currentRole.substring(0, charIndex + 1)}`;
            
        charIndex += isDeleting ? -1 : 1;
        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2500; // Pause to read
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 600; // Pause before next
        }
        setTimeout(typeEffect, typeSpeed);
    };
    setTimeout(typeEffect, 800);

    // 6. Intersection Observer for Scroll Animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
