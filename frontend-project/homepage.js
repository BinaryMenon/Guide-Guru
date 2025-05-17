document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const username = localStorage.getItem('username');
    
    if (!isAuthenticated || isAuthenticated !== 'true') {
        window.location.href = "login.html";
        return;
    }

    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Tab Functionality (with Buses redirect)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.textContent.trim() === 'Buses') {
                window.location.href = 'buses.html'; // Redirect to buses.html
            } else {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            }
        });
    });

    // Smooth Scroll (skip for external links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('username');
            window.location.href = "login.html";
        });
    }

    // Load featured locations (if needed)
    fetch('featured-locations.json')
        .then(response => response.json())
        .then(data => loadFeaturedLocations(data))
        .catch(error => console.error('Error:', error));
});

function loadFeaturedLocations(data) {
    const locationsContainer = document.querySelector('.swiper-wrapper');
    if (locationsContainer) {
        data.forEach(location => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="slide-image-container">
                    <img src="${location.image}" alt="${location.title}">
                </div>
                <div class="slide-content">
                    <h3>${location.title}</h3>
                    <p>${location.description}</p>
                </div>
            `;
            locationsContainer.appendChild(slide);
        });
    }
}
