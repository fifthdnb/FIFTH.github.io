// Hero Slideshow
const heroImages = [
    '../img/DSC01392.jpg',
    '../img/DSC01428.jpg',
    '../img/DSC01595.jpg',
    '../img/DSC01632.jpg',
    '../img/DSC01647.jpg'
];

let currentImageIndex = 0;
const slideshowContainer = document.querySelector('.hero-slideshow');

if (slideshowContainer) {
    // Create and append all images
    heroImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `FIFTH Background ${index + 1}`;
        if (index === 0) img.classList.add('active');
        slideshowContainer.appendChild(img);
    });
    
    // Start slideshow rotation
    setInterval(() => {
        const images = slideshowContainer.querySelectorAll('img');
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        images[currentImageIndex].classList.add('active');
    }, 5000); // 5 seconds per image
}

// Load Releases
function loadReleases() {
    const releasesGrid = document.getElementById('releases-grid');
    const releasesLoading = document.getElementById('releases-loading');
    
    if (!releasesGrid) return;
    
    fetch('releases.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load releases');
            return response.json();
        })
        .then(data => {
            // Hide loading message
            if (releasesLoading) {
                releasesLoading.style.display = 'none';
            }
            
            // Clear any existing content
            releasesGrid.innerHTML = '';
            
            // Generate release cards
            data.releases.forEach((release, index) => {
                const card = document.createElement('article');
                card.className = 'release-card';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', index * 50);
                
                card.innerHTML = `
                    <div class="release-image-wrapper">
                        <img src="${release.image}" alt="${release.title}" class="release-image" loading="lazy">
                        <div class="release-overlay">
                            <a href="https://open.spotify.com/artist/2nkPDrBTpqCFWeK3ZMLmlF" target="_blank" class="overlay-icon" aria-label="Listen on Spotify">
                                <i class="fa-brands fa-spotify"></i>
                            </a>
                            <a href="https://www.beatport.com/artist/fifth/742392" target="_blank" class="overlay-icon" aria-label="View on Beatport">
                                <i class="fa-solid fa-b"></i>
                            </a>
                        </div>
                    </div>
                    <div class="release-info">
                        <h3 class="release-title">${release.title}</h3>
                    </div>
                `;
                
                releasesGrid.appendChild(card);
            });
            
            // Refresh AOS animations for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading releases:', error);
            if (releasesLoading) {
                releasesLoading.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Failed to load releases';
            }
        });
}

// Load Agenda Events
function loadAgenda() {
    const agendaEvents = document.getElementById('agenda-events');
    const agendaLoading = document.getElementById('agenda-loading');
    
    if (!agendaEvents) return;
    
    fetch('agenda.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load agenda');
            return response.json();
        })
        .then(data => {
            // Hide loading message
            if (agendaLoading) {
                agendaLoading.style.display = 'none';
            }
            
            // Clear any existing content
            agendaEvents.innerHTML = '';
            
            // Generate event rows
            data.events.forEach((event, index) => {
                const row = document.createElement('div');
                row.className = 'tour-row';
                row.setAttribute('data-aos', 'fade-up');
                row.setAttribute('data-aos-delay', (index + 1) * 100);
                
                row.innerHTML = `
                    <div class="tour-date">
                        <span class="date-day">${event.day}</span>
                        <span class="date-month">${event.month}</span>
                    </div>
                    <div class="tour-event">
                        <span class="event-name">${event.eventName}</span>
                    </div>
                    <div class="tour-location">${event.location}</div>
                    <div class="tour-tickets">
                        <a href="${event.ticketUrl}" target="_blank" class="ticket-btn">Tickets</a>
                    </div>
                `;
                
                agendaEvents.appendChild(row);
            });
            
            // Refresh AOS animations for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading agenda:', error);
            if (agendaLoading) {
                agendaLoading.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Failed to load events';
            }
        });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuWrapper = document.querySelector('.mobile-menu-wrapper');
const header = document.querySelector('.header');

menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    menuWrapper.classList.toggle('active');
    header.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (menuWrapper.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-items a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuWrapper.classList.remove('active');
        header.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 75;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll-spy: Active Navigation Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.mobile-menu-items a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header backdrop blur on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Video Loading State and Background Control
const loadingOverlay = document.querySelector('.loading-overlay');

// Hide loading overlay after slideshow initializes
if (loadingOverlay) {
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 2000);
}

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out'
    });
}

// Load releases and agenda on page load
document.addEventListener('DOMContentLoaded', () => {
    loadReleases();
    loadAgenda();
});

// Blog functionality - Load and display blog posts
if (document.getElementById('blog-grid')) {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogGrid = document.getElementById('blog-grid');
            
            posts.forEach((post, index) => {
                const card = document.createElement('a');
                card.href = `post.html?id=${post.id}`;
                card.className = 'blog-card';
                card.setAttribute('data-aos', 'fade-zoom-in');
                card.setAttribute('data-aos-delay', (index * 100).toString());
                
                card.innerHTML = `
                    <img src="${post.image}" alt="${post.title}" class="blog-card-image">
                    <div class="blog-card-content">
                        <h2 class="blog-card-title">${post.title}</h2>
                        <p class="blog-card-date">${post.date}</p>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                    </div>
                `;
                
                blogGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));
}

// Load individual post on post.html
if (document.getElementById('post-content')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    // Update page title
                    document.title = `${post.title} - FIFTH`;
                    
                    // Load markdown content
                    fetch(post.file)
                        .then(response => response.text())
                        .then(markdown => {
                            const postContent = document.getElementById('post-content');
                            
                            // Create post header with image, title and date
                            const postHeader = `
                                <div class="post-header">
                                    <img src="${post.image}" alt="${post.title}" class="post-image">
                                    <h1>${post.title}</h1>
                                    <p class="post-date">${post.date}</p>
                                </div>
                            `;
                            
                            // Parse markdown and combine with header
                            if (typeof marked !== 'undefined') {
                                postContent.innerHTML = postHeader + marked.parse(markdown);
                            } else {
                                postContent.innerHTML = postHeader + markdown.replace(/\n/g, '<br>');
                            }
                        })
                        .catch(error => console.error('Error loading post content:', error));
                }
            })
            .catch(error => console.error('Error loading posts:', error));
    }
}

// Contact form handling
if (document.getElementById('contact-form')) {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const mailtoLink = `mailto:info@fifth.com?subject=${encodeURIComponent(subject + ' - From: ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        alert('Your email client will open. If it doesn\'t, please send your message to info@fifth.com');
    });
}
