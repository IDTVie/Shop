document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INTRO ANIMATION CLEANUP ---
    const intro = document.getElementById('netflix-intro');
    if (intro) {
        intro.addEventListener('animationend', () => {
            intro.style.display = 'none';
        });
        setTimeout(() => { intro.style.display = 'none'; }, 2600);
    }

    // --- 2. BACKGROUND CAROUSEL ---
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let slideIndex = 0;
        slides[0].classList.add('active');
        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
        }, 6000); 
    }

    // --- 3. INFINITE SCROLL ---
    const scrollers = document.querySelectorAll('.row-scroll');
    scrollers.forEach(scroller => {
        if (scroller.getAttribute('data-cloned') === 'true') return;
        const content = Array.from(scroller.children);
        content.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            scroller.appendChild(clone);
        });
        scroller.setAttribute('data-cloned', 'true');
    });

    // --- 4. STAGGERED SCROLL REVEAL (NEW COOL EFFECT) ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a container (like pricing), stagger the children
                if(entry.target.classList.contains('pricing-container') || entry.target.classList.contains('download-layout')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 150}ms`; // Stagger delay
                        child.classList.add('active');
                    });
                } else {
                    entry.target.classList.add('active');
                }
                
                // System detect trigger
                if (entry.target.querySelector('.system-detect-wrapper')) {
                    startSystemDetection();
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .pricing-container, .download-layout').forEach(el => observer.observe(el));

    // --- 5. SYSTEM DETECTION LOGIC ---
    let detectionRun = false;
    function startSystemDetection() {
        if (detectionRun) return;
        detectionRun = true;
        
        setTimeout(() => {
            const loading = document.getElementById('detect-loading');
            const success = document.getElementById('detect-success');
            
            if (loading && success) {
                loading.style.display = 'none';
                success.style.display = 'block';
                
                const ua = navigator.userAgent;
                const platform = navigator.platform || "";
                let os = "Windows", link = "https://www.stremio.com/downloads", icon = "fa-windows";
                
                if (/iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) { 
                    os = "iOS"; link = "https://web.strem.io/"; icon = "fa-apple"; 
                } else if (/Android/.test(ua)) { 
                    os = "Android"; link = "https://play.google.com/store/apps/details?id=com.stremio.one"; icon = "fa-android"; 
                } else if (/Mac/.test(ua)) { 
                    os = "macOS"; link = "https://www.stremio.com/downloads"; icon = "fa-apple"; 
                }
                
                const nameEl = document.getElementById('os-name');
                const iconEl = document.getElementById('os-icon');
                const btnEl = document.getElementById('smart-dl-btn');

                if (nameEl) nameEl.innerText = os;
                if (iconEl) iconEl.className = `fab ${icon}`;
                if (btnEl) btnEl.href = link;
            }
        }, 2000);
    }
    
    // --- 6. BLOG PROGRESS ROTATOR ---
    const blogSlides = document.querySelectorAll('.blog-slide');
    const progressBar = document.querySelector('.progress-fill');
    if (blogSlides.length > 0 && progressBar) {
        let blogIndex = 0;
        blogSlides[0].classList.add('active');
        setInterval(() => {
            blogSlides[blogIndex].classList.remove('active');
            progressBar.style.animation = 'none';
            void progressBar.offsetWidth;
            progressBar.style.animation = 'progressLoading 6s linear infinite';
            blogIndex = (blogIndex + 1) % blogSlides.length;
            blogSlides[blogIndex].classList.add('active');
        }, 6000); 
    }

    // --- 7. ESCAPE KEY ---
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") { closeAccessModal(); closeModal(); }
    });
});

// GLOBAL FUNCTIONS
window.toggleMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const icon = document.querySelector('.mobile-toggle i');
    if (navMenu) navMenu.classList.toggle('active');
    if (icon) { icon.classList.toggle('fa-bars'); icon.classList.toggle('fa-times'); }
}
const accessModal = document.getElementById('accessModal');
const contactModal = document.getElementById('contactModal');

window.openAccessModal = function() {
    if (accessModal) {
        accessModal.style.display = 'flex';
        setTimeout(() => accessModal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}
window.closeAccessModal = function() {
    if (accessModal) {
        accessModal.classList.remove('show');
        setTimeout(() => { accessModal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
    }
}
window.openContactModal = function() {
    if (contactModal) {
        contactModal.style.display = 'flex';
        setTimeout(() => contactModal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}
window.closeModal = function() {
    if (contactModal) {
        contactModal.classList.remove('show');
        setTimeout(() => { contactModal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
    }
}
window.openLiveChat = function() {
    closeAccessModal();
    if (typeof Tawk_API !== 'undefined') Tawk_API.maximize();
}
window.swapToEmailForm = function() {
    closeAccessModal();
    setTimeout(openContactModal, 300);
}

// TAWK.TO
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
Tawk_API.onLoad = function(){ Tawk_API.hideWidget(); };
(function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true; s1.src='https://embed.tawk.to/697371127d1f9f19791eed6a/1jflf3cmk';
    s1.charset='UTF-8'; s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();