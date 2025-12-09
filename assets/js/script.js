// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['frontend Developer', 'Laravel Developer', 'Nuxt Developer', 'Medusa js'],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 1500,
            showCursor: true
        });
    }

    

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu ul');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar.parentElement.parentElement,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    };

    // Animate counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.purecounter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-purecounter-end')) || 0;
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counter.parentElement,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    };

    // Initialize animations
    if (document.querySelector('.progress-bar')) {
        animateSkillBars();
    }

    if (document.querySelector('.purecounter')) {
        animateCounters();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a page link
            if (href.includes('.html')) return;
            
            e.preventDefault();
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="uil uil-spinner"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! I\'ll get back to you soon.');
                
                // Reset form
                this.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navmenu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add subtle hover effects to cards
    document.querySelectorAll('.project-card, .service-item, .stats-item, .info-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Add fade-in animations to sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});