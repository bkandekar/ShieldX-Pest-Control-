/* ==========================================================================
   SHIELDX PEST CONTROL SERVICES - INTERACTIVE CLIENT SIDE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Elevation on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            header.style.paddingTop = '6px';
            header.style.paddingBottom = '6px';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            header.style.paddingTop = '14px';
            header.style.paddingBottom = '14px';
        }
    });

    // 2. Mobile Navigation Drawer Controls
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent page scrolling behind drawer
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
            // Highlight active link
            drawerLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 3. Smooth Navigation Scroll Links Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset header height
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 4. FAQ Accordion Transitions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contextual Service Selection Hooks (from cards)
    const selectServiceButtons = document.querySelectorAll('.select-service');
    const serviceSelectDropdown = document.getElementById('serviceRequired');

    selectServiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const chosenService = button.getAttribute('data-service');
            
            if (serviceSelectDropdown && chosenService) {
                serviceSelectDropdown.value = chosenService;
                // Scroll smoothly to contact section
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                
                // Add tiny visual highlight to the dropdown
                serviceSelectDropdown.style.borderColor = '#F4B400';
                setTimeout(() => {
                    serviceSelectDropdown.style.borderColor = 'rgba(0,0,0,0.1)';
                }, 2000);
            }
        });
    });

    // 6. Contextual Plan Selection Hooks (from AMC cards)
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const chosenPlan = button.getAttribute('data-plan');
            
            if (serviceSelectDropdown && chosenPlan) {
                serviceSelectDropdown.value = chosenPlan;
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                
                serviceSelectDropdown.style.borderColor = '#F4B400';
                setTimeout(() => {
                    serviceSelectDropdown.style.borderColor = 'rgba(0,0,0,0.1)';
                }, 2000);
            }
        });
    });

    // Set minimum date picker to today
    const datePicker = document.getElementById('preferredDate');
    if (datePicker) {
        const today = new Date().toISOString().split('T')[0];
        datePicker.setAttribute('min', today);
    }

    // 7. Interactive Form Submissions with Glassmorphism Modal Feedback
    const pestForm = document.getElementById('pestContactForm');
    const successModal = document.getElementById('formSuccessModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (pestForm) {
        pestForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page refresh

            // Gather values
            const nameVal = document.getElementById('fullName').value.trim();
            const phoneVal = document.getElementById('phone').value.trim();
            const addressVal = document.getElementById('address').value.trim();
            const serviceVal = document.getElementById('serviceRequired').value;
            const dateVal = document.getElementById('preferredDate').value;

            // Simple validation
            if (!nameVal || !phoneVal || !addressVal || !serviceVal || !dateVal) {
                alert('Please fill out all required fields.');
                return;
            }

            // Fill details into Success Modal
            document.getElementById('successName').textContent = nameVal;
            document.getElementById('successService').textContent = serviceVal;
            
            // Format date beautifully
            const dateObj = new Date(dateVal);
            const formattedDate = dateObj.toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            document.getElementById('successDate').textContent = formattedDate;

            // Trigger safe local callback to Android via WebView if interface exists
            if (window.AndroidInterface && typeof window.AndroidInterface.onInspectionBooked === 'function') {
                window.AndroidInterface.onInspectionBooked(nameVal, phoneVal, serviceVal, dateVal);
            }

            // Display visual success card overlay
            successModal.classList.remove('hidden');
            successModal.style.opacity = '1';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.opacity = '0';
            setTimeout(() => {
                successModal.classList.add('hidden');
                // Reset form
                if (pestForm) pestForm.reset();
            }, 300);
        });
    }

    // 8. Custom Animation triggers on Intersection
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply basic transitions to section titles & cards
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .process-step, .pricing-card, .review-card, .blog-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });
});
