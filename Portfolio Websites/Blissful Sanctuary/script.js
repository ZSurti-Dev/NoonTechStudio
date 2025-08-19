window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileNavToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileNavToggle.textContent = '☰';
            });
        });

        // Testimonials slider
        const track = document.getElementById('testimonials-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const nextButton = document.getElementById('next-testimonial');
        const prevButton = document.getElementById('prev-testimonial');
        let currentIndex = 0;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        // Auto rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 6000);

        // Booking form submission
        const bookingForm = document.getElementById('bookingForm');
        const bookingModal = document.getElementById('bookingModal');
        const closeModal = document.getElementById('closeModal');

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            bookingModal.classList.add('show');
            
            // Add a subtle success animation
            const confirmation = document.querySelector('.confirmation-message');
            confirmation.style.transform = 'scale(0.9)';
            confirmation.style.opacity = '0';
            
            setTimeout(() => {
                confirmation.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                confirmation.style.transform = 'scale(1)';
                confirmation.style.opacity = '1';
            }, 100);
            
            // Reset form
            bookingForm.reset();
        });

        closeModal.addEventListener('click', function() {
            bookingModal.classList.remove('show');
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('show');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add hover effects to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add floating animation to hero elements
        function createFloatingAnimation() {
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const delay = index * 2000;
                const duration = 6000 + (index * 1000);
                
                element.style.animationDelay = `${delay}ms`;
                element.style.animationDuration = `${duration}ms`;
            });
        }

        // Initialize floating animations
        createFloatingAnimation();

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Newsletter form submission
        const newsletterForm = document.querySelector('.footer-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Subscribed! ✓';
                button.style.background = 'var(--gradient-accent)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    this.reset();
                }, 3000);
            });
        }

        // Add dynamic greeting based on time of day
        function updateGreeting() {
            const hour = new Date().getHours();
            const heroTitle = document.querySelector('.hero h1');
            
            if (heroTitle) {
                let greeting = 'Find Your Inner Peace';
                
                if (hour < 12) {
                    greeting = 'Start Your Day with Serenity';
                } else if (hour < 17) {
                    greeting = 'Refresh Your Afternoon';
                } else {
                    greeting = 'Unwind This Evening';
                }
                
                // Only update if it's different to avoid flashing
                if (heroTitle.textContent !== greeting) {
                    heroTitle.style.opacity = '0';
                    setTimeout(() => {
                        heroTitle.textContent = greeting;
                        heroTitle.style.opacity = '1';
                    }, 300);
                }
            }
        }

        // Update greeting on page load
        updateGreeting();

        // Add subtle cursor trail effect
        let dots = [];
        let mouse = { x: 0, y: 0 };

        window.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function createDot() {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                top: ${mouse.y}px;
                left: ${mouse.x}px;
                width: 4px;
                height: 4px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.7;
                transform: translate(-50%, -50%);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(dot);
            dots.push(dot);
            
            setTimeout(() => {
                dot.style.opacity = '0';
                dot.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 100);
            
            setTimeout(() => {
                document.body.removeChild(dot);
                dots = dots.filter(d => d !== dot);
            }, 400);
        }

        // Only add cursor trail on desktop
        if (window.innerWidth > 768) {
            let trailTimer;
            window.addEventListener('mousemove', function() {
                clearTimeout(trailTimer);
                trailTimer = setTimeout(createDot, 50);
            });
        }

        // Add enhanced loading states for forms
        function addLoadingState(button) {
            const originalText = button.textContent;
            button.disabled = true;
            button.style.opacity = '0.7';
            button.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    Processing...
                </div>
            `;
            
            // Add keyframe animation for spinner
            if (!document.querySelector('#spinner-style')) {
                const style = document.createElement('style');
                style.id = 'spinner-style';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            return () => {
                button.disabled = false;
                button.style.opacity = '1';
                button.textContent = originalText;
            };
        }

        // Apply loading states to form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const button = this.querySelector('button[type="submit"]');
                if (button) {
                    const resetLoading = addLoadingState(button);
                    
                    // Reset loading state after a delay
                    setTimeout(resetLoading, 1500);
                }
            });
        });

        // Add performance optimization for scroll events
        let ticking = false;
        
        function updateOnScroll() {
            // Header scroll effect
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Parallax effect
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }
        
        // Replace existing scroll listeners with optimized version
        window.addEventListener('scroll', requestScrollUpdate);

        // Add accessibility improvements
        document.addEventListener('keydown', function(e) {
            // Close modal with Escape key
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.show');
                if (modal) {
                    modal.classList.remove('show');
                }
            }
        });

        // Add focus management for modal
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        function trapFocus(element) {
            const focusableContent = element.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        // Apply focus trapping to modal
        const modal = document.getElementById('bookingModal');
        if (modal) {
            trapFocus(modal);
        }

        console.log('🌿 Serenity Spa website loaded successfully');