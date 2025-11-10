/**
 * E-BOOK / DIGITAL COURSE LANDING PAGE - JavaScript
 * Handles mobile menu, FAQ accordion, scroll animations, form interactions, and theme toggle
 */

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : 'none';
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
    '.benefit-card, .module-card, .review-card'
);

revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 4px 12px rgba(108, 92, 231, 0.15)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 4px 6px rgba(108, 92, 231, 0.1)';
    }
});

// Initialize hero fade-in animations on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Module card stagger animation
const moduleCards = document.querySelectorAll('.module-card');
const moduleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            moduleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

moduleCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    moduleObserver.observe(card);
});

// Review card stagger animation
const reviewCards = document.querySelectorAll('.review-card');
const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            reviewObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reviewCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    reviewObserver.observe(card);
});

// Parallax effect for mockup badges
window.addEventListener('mousemove', (e) => {
    const badges = document.querySelectorAll('.mockup-badge');
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    badges.forEach((badge, index) => {
        const speed = (index + 1) * 0.03;
        const moveX = (clientX - innerWidth / 2) * speed;
        const moveY = (clientY - innerHeight / 2) * speed;
        
        badge.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// CTA button click tracking
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        
        console.log('CTA clicked:', {
            text: buttonText,
            section: this.closest('section')?.id || 'hero',
            timestamp: new Date().toISOString()
        });
        
        // Here you would typically send to analytics
        // Example: gtag('event', 'purchase_intent', { button_text: buttonText });
    });
});

// Free sample download handler
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Sample') || btn.textContent.includes('Free')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In production, trigger actual download or open modal for email capture
            alert('Free sample chapter will be sent to your email. Please enter your email address.');
            
            // Example: Show email capture modal
            console.log('Free sample requested');
        });
    }
});

// Animate stats on scroll
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = document.querySelectorAll('.stat-item');
                
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Set initial state
    document.querySelectorAll('.stat-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    statsObserver.observe(statsSection);
}

// Pricing card entrance animation
const pricingCard = document.querySelector('.pricing-card');
if (pricingCard) {
    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                pricingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    pricingCard.style.opacity = '0';
    pricingCard.style.transform = 'translateY(40px)';
    pricingCard.style.transition = 'all 0.8s ease';
    pricingObserver.observe(pricingCard);
}

// Add hover effects to benefit cards
document.querySelectorAll('.benefit-card').forEach(card => {
    const icon = card.querySelector('.benefit-icon');
    
    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Highlight active FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        // Scroll FAQ item into view if needed
        const item = this.closest('.faq-item');
        if (item.classList.contains('active')) {
            setTimeout(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// Add urgency timer (example: limited time offer)
function updateTimer() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const diff = endOfDay - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // You can display this in a timer element if you add one
    console.log(`Time remaining: ${hours}h ${minutes}m ${seconds}s`);
}

// Update timer every second
setInterval(updateTimer, 1000);

console.log('E-book Landing Page loaded successfully! 📚');
