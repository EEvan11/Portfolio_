// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar effects on scroll - Enhanced
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Scroll progress bar
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (currentScroll / windowHeight) * 100;

        if (navbar) {
            const progressBar = navbar.querySelector('::before') || navbar;
            navbar.style.setProperty('--scroll-width', scrolled + '%');
        }

        lastScroll = currentScroll;
    });

    // Add magnetic effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function (e) {
            this.style.transition = 'all 0.1s ease';
        });

        link.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-2px)`;
        });

        link.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Logo animation on hover
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        logoText.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Navbar glow effect following mouse
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth > 768) {
        const navGlow = document.createElement('div');
        navGlow.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 243, 255, 0.15), transparent 70%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        `;
        navContainer.appendChild(navGlow);

        navbar.addEventListener('mouseenter', () => {
            navGlow.style.opacity = '1';
        });

        navbar.addEventListener('mouseleave', () => {
            navGlow.style.opacity = '0';
        });

        navbar.addEventListener('mousemove', (e) => {
            const rect = navContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - 100;
            const y = e.clientY - rect.top - 100;
            navGlow.style.left = x + 'px';
            navGlow.style.top = y + 'px';
        });
    }

    // Initialize Swiper for projects - Full Width
    const projectsSwiper = new Swiper('.projectsSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 350,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        speed: 1200,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                coverflowEffect: {
                    depth: 200,
                }
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 40
            }
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-item, .contact-card, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        const floatingCard = document.querySelector('.floating-card');

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            hero.style.opacity = 1 - (scrolled / 700);
        }

        if (floatingCard && scrolled < window.innerHeight) {
            floatingCard.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.03}deg)`;
        }
    });

    // Cursor glow effect
    const createCursorGlow = () => {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 243, 255, 0.15), transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
        `;
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            glow.style.left = (mouseX - 150) + 'px';
            glow.style.top = (mouseY - 150) + 'px';
        });
    };

    if (window.innerWidth > 768) {
        createCursorGlow();
    }

    // Typing effect for hero title
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const originalText = glitchText.textContent;
        glitchText.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                glitchText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };

        setTimeout(typeWriter, 300);
    }

    // Add click ripple effect
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            border: 2px solid var(--neon-blue);
            width: 50px;
            height: 50px;
            left: ${e.clientX - 25}px;
            top: ${e.clientY - 25}px;
            pointer-events: none;
            z-index: 9999;
            animation: rippleExpand 0.6s ease-out;
        `;
        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleExpand {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Random floating particles
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const colors = ['#00f3ff', '#ff006e', '#8b5cf6', '#00ff88'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${randomColor};
                box-shadow: 0 0 10px ${randomColor};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${10 + Math.random() * 20}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
                opacity: 0.6;
            `;
            particlesContainer.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px);
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -200}px);
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px);
                }
            }
        `;
        document.head.appendChild(style);
    };

    createParticles();

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.textShadow = '';
                });
                if (navLink) {
                    navLink.style.color = '#00f3ff';
                    navLink.style.textShadow = '0 0 10px #00f3ff';
                }
            }
        });
    });

    // Page load animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🚀 Futuristic Portfolio Loaded!');
});
