// Simple gallery carousel with auto-centering
function scrollGallery(direction) {
    const container = document.querySelector('.gallery-container');
    const items = document.querySelectorAll('.gallery-item');
    const scrollAmount = 220; // Largeur d'une image (200px) + gap (20px)
    
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
    
    // Auto-center after scroll
    setTimeout(() => {
        centerNearestItem();
    }, 300);
}

function centerNearestItem() {
    const container = document.querySelector('.gallery-container');
    const items = document.querySelectorAll('.gallery-item');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    
    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
    });
    
    // Center the nearest item
    const nearestItem = items[nearestIndex];
    const itemRect = nearestItem.getBoundingClientRect();
    const scrollOffset = itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2;
    
    container.scrollTo({
        left: container.scrollLeft + scrollOffset,
        behavior: 'smooth'
    });
}

// Auto-center on scroll end
let scrollTimeout;
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.gallery-container');
    if (container) {
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(centerNearestItem, 150);
        });
        
        // Initial centering
        setTimeout(centerNearestItem, 100);
    }
});

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .about-text, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Here you would normally send the data to a server
        // For now, we'll show a success message
        alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// Gallery lightbox effect
const galleryItemsLightbox = document.querySelectorAll('.gallery-item');
galleryItemsLightbox.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            width: 100%;
            height: auto;
            border-radius: 10px;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 40px;
            cursor: pointer;
            background: none;
            border: none;
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        };
        
        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Phone link formatting
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Optional: Add tracking for phone calls
        console.log('Phone call initiated');
    });
});

// Planity reservation tracking
const planityLink = document.querySelector('.btn-reservation');
if (planityLink) {
    planityLink.addEventListener('click', () => {
        // Optional: Add tracking for reservation clicks
        console.log('Reservation button clicked');
    });
}

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic year in footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Espace Paris Coiffure. Tous droits réservés.`;
}

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
        }, 100);
    });
    
    // Handle image loading errors
    img.addEventListener('error', () => {
        img.style.background = '#f0f0f0';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = '#999';
        img.innerHTML = 'Image non disponible';
    });
});

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%cEspace Paris Coiffure - Site Web', 'color: #ff8c42; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé avec passion pour l\'art de la coiffure', 'color: #4a9d4a; font-size: 14px;');
