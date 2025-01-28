// Blog Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Бургер-меню
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    burger.addEventListener('click', () => {
        // Переключаем классы active
				document.body.classList.toggle('menu-open');
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Закрываем меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !nav.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                burger?.classList.remove('active');
                nav?.classList.remove('active');
            }
        });
    });

    // Phone number validation and agreement checkbox
    const phoneInput = document.querySelector('input[type="tel"]');
    const agreementCheckbox = document.querySelector('.checkbox-label input[type="checkbox"]');
    const downloadBtn = document.querySelector('.btn-download');

    if (phoneInput && downloadBtn && agreementCheckbox) {
        const validateForm = () => {
            const isPhoneValid = phoneInput.value.replace(/\D/g, '').length >= 10;
            const isAgreed = agreementCheckbox.checked;
            downloadBtn.disabled = !(isPhoneValid && isAgreed);
        };

        phoneInput.addEventListener('input', validateForm);
        agreementCheckbox.addEventListener('change', validateForm);
    }

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.f101-feature-card, .mode-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Stats Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-value');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = target.innerText;
                    const suffix = value.replace(/[0-9.]/g, '');
                    const number = parseFloat(value.replace(/[^0-9.]/g, ''));
                    let current = 0;
                    const increment = number / 50;
                    const duration = 1500;
                    const interval = duration / 50;

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.innerText = value;
                            clearInterval(counter);
                        } else {
                            target.innerText = Math.floor(current) + suffix;
                        }
                    }, interval);

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    // Tournament countdown
    function updateCountdowns() {
        const countdowns = document.querySelectorAll('.countdown');
        countdowns.forEach(countdown => {
            const [hours, minutes, seconds] = countdown.textContent.split(':').map(Number);
            let totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            const timer = setInterval(() => {
                totalSeconds--;
                if (totalSeconds <= 0) {
                    clearInterval(timer);
                    countdown.textContent = 'Finished';
                    return;
                }
                
                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;
                
                countdown.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            }, 1000);
        });
    }

    // Call animation function when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        animateStats();
        updateCountdowns();
    });

    // Download form submission
    const downloadForm = document.querySelector('.download-form');
    if (downloadForm) {
        downloadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = phoneInput?.value;
            if (phone && phone.replace(/\D/g, '').length >= 10 && agreementCheckbox?.checked) {
                alert('Download link will be sent to your phone number');
                phoneInput.value = '';
                agreementCheckbox.checked = false;
                downloadBtn?.setAttribute('disabled', 'true');
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        const formCheckbox = contactForm.querySelector('input[type="checkbox"]');
        const submitButton = contactForm.querySelector('.btn-submit');

        const validateForm = () => {
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
                if (input.type === 'email' && !isValidEmail(input.value)) {
                    isValid = false;
                }
            });
            if (!formCheckbox?.checked) {
                isValid = false;
            }
            submitButton.disabled = !isValid;
        };

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        formInputs.forEach(input => {
            input.addEventListener('input', validateForm);
        });
        formCheckbox?.addEventListener('change', validateForm);

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!submitButton.disabled) {
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
                submitButton.disabled = true;
            }
        });
    }
}); 