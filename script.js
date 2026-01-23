document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Intro Cleanup
    setTimeout(() => {
        const intro = document.getElementById('netflix-intro');
        if(intro) intro.style.display = 'none';
    }, 4500);

    // 1. Carousel
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    if(slides.length > 0) {
        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
        }, 6000); 
    }

    // 2. Infinite Scroll
    const scrollers = document.querySelectorAll('.row-scroll');
    scrollers.forEach(scroller => {
        const content = Array.from(scroller.children);
        content.forEach(item => scroller.appendChild(item.cloneNode(true)));
    });

    // 3. Scroll Reveal & System Detect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                if(entry.target.querySelector('.system-detect-wrapper')) {
                    startSystemDetection();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. System Detection
    let detectionRun = false;
    function startSystemDetection() {
        if(detectionRun) return;
        detectionRun = true;
        setTimeout(() => {
            const loading = document.getElementById('detect-loading');
            const success = document.getElementById('detect-success');
            if(loading && success) {
                loading.style.display = 'none';
                success.style.display = 'block';
                
                const ua = navigator.userAgent;
                let os = "Windows", link = "https://www.stremio.com/downloads", icon = "fa-windows";
                
                if(/iPad|iPhone/.test(ua)) { os="iOS"; link="https://web.strem.io/"; icon="fa-apple"; }
                else if(/Android/.test(ua)) { os="Android"; link="https://play.google.com/store/apps/details?id=com.stremio.one"; icon="fa-android"; }
                else if(/Mac/.test(ua)) { os="macOS"; icon="fa-apple"; }
                
                document.getElementById('os-name').innerText = os;
                document.getElementById('os-icon').className = `fab ${icon}`;
                document.getElementById('smart-dl-btn').href = link;
            }
        }, 2000);
    }
    
    // 5. INFINITE BLOG ROTATOR LOGIC
    const blogSlides = document.querySelectorAll('.blog-slide');
    const progressBar = document.querySelector('.progress-fill');
    let blogIndex = 0;
    
    if(blogSlides.length > 0) {
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
});

// --- GLOBAL FUNCTIONS ---
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
    const icon = document.querySelector('.mobile-toggle i');
    if(icon) { icon.classList.toggle('fa-bars'); icon.classList.toggle('fa-times'); }
}

const accessModal = document.getElementById('accessModal');
const contactModal = document.getElementById('contactModal');

function openAccessModal() {
    if(accessModal) {
        accessModal.style.display = 'flex';
        setTimeout(() => accessModal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}
function closeAccessModal() {
    if(accessModal) {
        accessModal.classList.remove('show');
        setTimeout(() => { accessModal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
    }
}
function openLiveChat() {
    closeAccessModal();
    if(typeof Tawk_API !== 'undefined') Tawk_API.maximize();
    else alert("Live Chat connecting...");
}
function swapToEmailForm() {
    closeAccessModal();
    setTimeout(openContactModal, 300);
}
function openContactModal() {
    if(contactModal) {
        contactModal.style.display = 'flex';
        setTimeout(() => contactModal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}
function closeModal() {
    if(contactModal) {
        contactModal.classList.remove('show');
        setTimeout(() => { contactModal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
    }
}

var Tawk_API=Tawk_API||{};
Tawk_API.onLoad = function(){ Tawk_API.hideWidget(); };
(function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/697371127d1f9f19791eed6a/1jflf3cmk';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();