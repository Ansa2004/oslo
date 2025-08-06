// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Active Navigation Link Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active nav link
    updateActiveNavLink();

    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderBackground);

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .product-category, .highlight-card, .contact-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add loading class removal for better performance
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Preload images for better performance
    function preloadImages() {
        const images = [
            'https://pplx-res.cloudinary.com/image/upload/v1748568258/pplx_project_search_images/60215357b0b2c2d7b644be5a37ece3bd48a72dd7.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392976/pplx_project_search_images/5262908408206f256d17ea646e60171cd6c58186.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1753428285/pplx_project_search_images/a532bde9d30a00a9e422830cf73d3c48a883b424.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1753425137/pplx_project_search_images/725c12f4106692aa8a74edad8a11fc7cd09cb729.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392976/pplx_project_search_images/13fb8dc9293bda3475d6369d1eddd77985943e04.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392975/pplx_project_search_images/7b52c57b95f08cf8764a6db454baba72a505bc5e.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392975/pplx_project_search_images/d68065f86b3c38643ec7f00378bd9ed83f6cac23.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392975/pplx_project_search_images/4086dc151922f682d6fc71f6fb40437105aff588.jpg',
            'https://pplx-res.cloudinary.com/image/upload/v1754392975/pplx_project_search_images/7bd68ee057073c940617bde1e967dfccf813b889.jpg'
        ];

        images.forEach(imageSrc => {
            const img = new Image();
            img.src = imageSrc;
        });
    }

    // Call preload function
    preloadImages();

    // Add smooth scroll behavior for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add hover effects for interactive elements
    const interactiveCards = document.querySelectorAll('.service-card, .product-category, .highlight-card, .contact-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Add focus management for accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            // Close mobile menu when navigating with keyboard
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateHeaderBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace direct scroll listeners with throttled version
    window.removeEventListener('scroll', updateActiveNavLink);
    window.removeEventListener('scroll', updateHeaderBackground);
    window.addEventListener('scroll', requestTick);

    // Add loading state management
    let isLoading = true;
    
    window.addEventListener('load', function() {
        isLoading = false;
        document.body.classList.add('page-loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const firstSection = document.querySelector('.hero');
            if (firstSection) {
                firstSection.classList.add('animate-in');
            }
        }, 100);
    });

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    console.log('OSLO BABY & KIDS website initialized successfully!');
});