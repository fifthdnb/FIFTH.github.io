// Hero Slideshow
// Detect base path based on current location
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/FIFTH.github.io/')) {
        return '/FIFTH.github.io';
    }
    return '';
}

const basePath = getBasePath();

// Apply configuration to all links with data attributes
function applyConfig() {
    // Social media links
    document.querySelectorAll('[data-social]').forEach(link => {
        const platform = link.getAttribute('data-social');
        if (CONFIG.socials[platform]) {
            link.href = CONFIG.socials[platform];
        }
    });
    
    // Contact links
    document.querySelectorAll('[data-contact]').forEach(link => {
        const type = link.getAttribute('data-contact');
        if (CONFIG.contact[type]) {
            if (type === 'email') {
                link.href = `mailto:${CONFIG.contact[type]}`;
                link.textContent = CONFIG.contact[type];
            } else if (type === 'website') {
                link.href = CONFIG.contact[type];
                link.textContent = CONFIG.contact[type];
            } else if (type === 'pressKit') {
                link.href = CONFIG.contact[type];
            }
        }
    });
    
    // Copyright year
    document.querySelectorAll('[data-year]').forEach(element => {
        element.textContent = CONFIG.site.copyrightYear;
    });
}

const heroImages = [
    `${basePath}/img/Homepage_1.JPG`,
    `${basePath}/img/Homepage_2.JPG`,
    `${basePath}/img/Homepage_3.JPG`,
    `${basePath}/img/Homepage_4.JPG`,
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
    
    // Detect if we're on the homepage or music.html page
    const isInWebsiteFolder = window.location.pathname.includes('/website/');
    const basePath = isInWebsiteFolder ? '..' : getBasePath();
    const jsonPath = isInWebsiteFolder ? '../content/releases.json' : `${basePath}/content/releases.json`;
    
    fetch(jsonPath)
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
                        <img src="${isInWebsiteFolder ? '../' : basePath + '/'}${release.image}" alt="${release.artist} - ${release.album}" class="release-image" loading="lazy">
                        <div class="release-overlay">
                            <div class="overlay-icons">
                                <a href="${release.spotify || 'https://open.spotify.com/artist/2nkPDrBTpqCFWeK3ZMLmlF'}" target="_blank" class="overlay-icon" aria-label="Listen on Spotify">
                                    <i class="fa-brands fa-spotify"></i>
                                </a>
                                <a href="${release.soundcloud || '#'}" target="_blank" class="overlay-icon" aria-label="Listen on SoundCloud">
                                    <i class="fa-brands fa-soundcloud"></i>
                                </a>
                                <a href="${release.applemusic || '#'}" target="_blank" class="overlay-icon" aria-label="Listen on Apple Music">
                                    <i class="fa-brands fa-apple"></i>
                                </a>
                                <a href="${release.beatport || 'https://www.beatport.com/artist/fifth/742392'}" target="_blank" class="overlay-icon" aria-label="View on Beatport">
                                    <i class="fa-solid fa-b"></i>
                                </a>
                            </div>
                            <div class="release-overlay-info">
                                ${release.title ? `<p class="release-overlay-track-title">${release.title}</p>` : ''}
                                <p class="release-overlay-artist">${release.artist}</p>
                                <h3 class="release-overlay-title">${release.album}</h3>
                                ${release.year ? `<p class="release-overlay-year">${release.year}</p>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="release-info">
                        <h3 class="release-title">${release.artist} - ${release.album}</h3>
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
    
    // Get base path for GitHub Pages compatibility
    const basePath = getBasePath();
    
    fetch(`${basePath}/content/agenda.json`)
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
    const basePath = getBasePath();
    
    // Fix favicon
    const favicon = document.getElementById('favicon');
    if (favicon) {
        favicon.href = `${basePath}/svg/fifth_LOGO_2.svg`;
    }
    
    // Fix loading logo
    const pulseLogos = document.querySelectorAll('.pulse-logo');
    pulseLogos.forEach(logo => {
        logo.src = `${basePath}/svg/fifth_LOGO_2.svg`;
    });
    
    // Fix hero logo
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.src = `${basePath}/svg/fifth_LOGO_2_WHITE.svg`;
    }
    
    // Fix logo images for GitHub Pages
    const logoImages = document.querySelectorAll('.logo img');
    logoImages.forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('../svg/')) {
            img.src = `${basePath}/${src.replace('../', '')}`;
        }
    });
    
    // Fix photo divider background
    const photoDividerBio = document.getElementById('photo-divider-bio');
    if (photoDividerBio) {
        photoDividerBio.style.backgroundImage = `url('${basePath}/img/Biography_achtergrond.JPG')`;
    }
    
    loadReleases();
    loadAgenda();
    loadBlogPosts();
    loadAllPosts();
});

// Blog functionality - Load and display blog posts (for homepage - 3 most recent)
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;
    
    // Get base path for GitHub Pages compatibility
    const basePath = getBasePath();
    
    fetch(`${basePath}/content/posts.json`)
        .then(response => response.json())
        .then(posts => {
            // Only show first 3 posts on homepage
            const recentPosts = posts.slice(0, 3);
            
            recentPosts.forEach((post, index) => {
                const card = document.createElement('a');
                card.href = `${basePath}/website/post.html?id=${post.id}`;
                card.className = 'blog-card';
                card.setAttribute('data-aos', 'fade-zoom-in');
                card.setAttribute('data-aos-delay', (index * 100).toString());
                
                const imageSrc = basePath ? `${basePath}/${post.image}` : `./${post.image}`;
                card.innerHTML = `
                    <img src="${imageSrc}" alt="${post.title}" class="blog-card-image">
                    <div class="blog-card-content">
                        <h2 class="blog-card-title">${post.title}</h2>
                        <p class="blog-card-date">${post.date}</p>
                        <p class="blog-card-excerpt">${post.excerpt}</p>
                    </div>
                `;
                
                blogGrid.appendChild(card);
            });
            
            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => console.error('Error loading blog posts:', error));
}

// Load all posts for posts.html page
function loadAllPosts() {
    const postsList = document.getElementById('posts-list');
    const postsLoading = document.getElementById('posts-loading');
    
    if (!postsList) return;
    
    // Detect if we're in the website folder
    const isInWebsiteFolder = window.location.pathname.includes('/website/');
    const basePath = isInWebsiteFolder ? '..' : '';
    
    fetch(`${basePath}/content/posts.json`)
        .then(response => response.json())
        .then(posts => {
            // Hide loading message
            if (postsLoading) {
                postsLoading.style.display = 'none';
            }
            
            // Clear any existing content
            postsList.innerHTML = '';
            
            posts.forEach((post, index) => {
                const postItem = document.createElement('a');
                postItem.href = `${basePath}/website/post.html?id=${post.id}`;
                postItem.className = 'post-list-item';
                postItem.setAttribute('data-aos', 'fade-up');
                postItem.setAttribute('data-aos-delay', (index * 50).toString());
                
                const imagePath = post.image.startsWith('img/') ? `${basePath}/${post.image}` : post.image;
                
                postItem.innerHTML = `
                    <div class="post-list-image">
                        <img src="${imagePath}" alt="${post.title}">
                    </div>
                    <div class="post-list-content">
                        <h2 class="post-list-title">${post.title}</h2>
                        <p class="post-list-date">${post.date}</p>
                        <p class="post-list-excerpt">${post.excerpt}</p>
                    </div>
                `;
                
                postsList.appendChild(postItem);
            });
            
            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading posts:', error);
            if (postsLoading) {
                postsLoading.innerHTML = '<p>Error loading posts. Please try again.</p>';
            }
        });
}

// Load individual post on post.html
if (document.getElementById('post-content')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId) {
        // Get base path for GitHub Pages compatibility
        const basePath = window.location.pathname.includes('/website/') 
            ? window.location.pathname.substring(0, window.location.pathname.indexOf('/website/')) 
            : '';
        
        fetch(`${basePath}/content/posts.json`)
            .then(response => response.json())
            .then(posts => {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    // Update page title
                    document.title = `${post.title} - FIFTH`;
                    
                    // Load markdown content from blog-posts folder
                    const markdownPath = `${basePath}/content/blog-posts/${postId}.md`;
                    fetch(markdownPath)
                        .then(response => response.text())
                        .then(markdown => {
                            const postContent = document.getElementById('post-content');
                            
                            // Fix image path for post.html
                            const imagePath = post.image.startsWith('img/') ? `${basePath}/${post.image}` : post.image;
                            
                            // Create post header with image, title and date
                            const postHeader = `
                                <div class="post-header">
                                    <img src="${imagePath}" alt="${post.title}" class="post-image">
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
                        .catch(error => {
                            console.error('Error loading post content:', error);
                            document.getElementById('post-content').innerHTML = '<p>Error loading post content. Please try again.</p>';
                        });
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                document.getElementById('post-content').innerHTML = '<p>Error loading posts. Please try again.</p>';
            });
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

// Load Footer Component
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    // Detect if we're in a subfolder
    const isInWebsiteFolder = window.location.pathname.includes('/website/');
    const footerPath = isInWebsiteFolder ? 'footer.html' : 'website/footer.html';
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
            
            // Fix relative paths based on current location
            if (!isInWebsiteFolder) {
                // We're on index.html (root level)
                const footerLinks = footerContainer.querySelectorAll('.footer-link');
                footerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('../index.html')) {
                        // Change ../index.html to just index.html or remove ../
                        link.href = href.replace('../index.html', 'index.html');
                    } else if (href === 'biography.html') {
                        // Change biography.html to website/biography.html
                        link.href = 'website/biography.html';
                    }
                });
            }
            
            // Apply config to footer links
            applyConfig();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

// Load Header Component
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    // Detect if we're in a subfolder
    const isInWebsiteFolder = window.location.pathname.includes('/website/');
    const headerPath = isInWebsiteFolder ? 'header.html' : 'website/header.html';
    
    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;
            
            // Fix relative paths based on current location
            if (!isInWebsiteFolder) {
                // We're on index.html (root level)
                const logoLink = headerContainer.querySelector('.header-logo-link');
                if (logoLink) {
                    logoLink.href = 'index.html';
                }
                
                const logoImages = headerContainer.querySelectorAll('.logo img');
                logoImages.forEach(img => {
                    img.src = img.src.replace('../svg/', 'svg/');
                });
                
                const navLinks = headerContainer.querySelectorAll('.header-nav-link');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('../index.html')) {
                        link.href = href.replace('../index.html', 'index.html');
                    } else if (href === 'biography.html') {
                        link.href = 'website/biography.html';
                    }
                });
            }
            
            // Re-initialize menu toggle functionality after header is loaded
            initializeMenuToggle();
            
            // Apply config to header links
            applyConfig();
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

// Menu toggle functionality (extracted to be reusable)
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
    const logo = document.querySelector('.logo');
    
    if (!menuToggle || !mobileMenuWrapper) return;
    
    // Remove existing listeners to avoid duplicates
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    newMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenuWrapper.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        if (logo) {
            logo.classList.toggle('menu-open');
        }
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.mobile-menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            newMenuToggle.classList.remove('active');
            mobileMenuWrapper.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (logo) {
                logo.classList.remove('menu-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!newMenuToggle.contains(e.target) && !mobileMenuWrapper.contains(e.target)) {
            newMenuToggle.classList.remove('active');
            mobileMenuWrapper.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (logo) {
                logo.classList.remove('menu-open');
            }
        }
    });
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}

// Fix all paths for GitHub Pages on subpages
if (window.location.pathname.includes('/website/')) {
    document.addEventListener('DOMContentLoaded', () => {
        const basePath = getBasePath();
        
        // Fix all images with relative paths
        document.querySelectorAll('img[src^="../"]').forEach(img => {
            const src = img.getAttribute('src');
            if (src.startsWith('../')) {
                const newSrc = src.replace('../', basePath + '/');
                img.src = newSrc;
            }
        });
        
        // Fix all links with relative paths
        document.querySelectorAll('link[href^="../"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('../')) {
                const newHref = href.replace('../', basePath + '/');
                link.href = newHref;
            }
        });
        
        // Fix all CSS background images
        document.querySelectorAll('[style*="background-image"]').forEach(el => {
            const style = el.getAttribute('style');
            if (style && style.includes('../')) {
                const newStyle = style.replace(/\.\.\/img\//g, basePath + '/img/');
                el.setAttribute('style', newStyle);
            }
        });
    });
}
