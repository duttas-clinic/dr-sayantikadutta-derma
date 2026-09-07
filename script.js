// --- Language Toggle ---
let currentLang = 'en';
function toggleLanguage() {
    const langText = document.getElementById('langText');
    if (currentLang === 'en') {
        currentLang = 'bn';
        langText.textContent = 'BN';
        alert('Bengali translation coming soon!');
    } else {
        currentLang = 'en';
        langText.textContent = 'EN';
    }
}

// --- Video Player ---
function playVideo() {
    const container = document.querySelector('.video-container');
    // Replace VIDEO_ID with your actual YouTube video ID
    container.innerHTML = '<iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
}

// --- Skin Quiz ---
let currentQuestion = 0;
const questions = [
    { q: "How does your skin feel after cleansing?", options: ["Tight and dry", "Comfortable and balanced", "Oily in T-zone", "Shiny all over"] },
    { q: "How often do you experience breakouts?", options: ["Rarely or never", "Occasionally", "Frequently", "Constantly"] },
    { q: "How does your skin react to sun exposure?", options: ["Burns easily", "Tans gradually", "Tans easily", "Never burns"] }
];
const results = {
    0: { type: "Dry Skin", desc: "Your skin needs extra hydration and nourishment. We recommend gentle cleansers, hyaluronic acid serums, and rich moisturizers." },
    1: { type: "Normal Skin", desc: "You have balanced skin! Maintain it with a consistent routine including antioxidants and SPF." },
    2: { type: "Combination Skin", desc: "Your T-zone needs oil control while other areas need hydration. We recommend targeted treatments for different zones." },
    3: { type: "Oily Skin", desc: "Focus on oil-free products, salicylic acid, and regular exfoliation. We offer excellent acne control treatments." }
};

function selectOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            document.getElementById('questionText').textContent = questions[currentQuestion].q;
            const optsDiv = document.getElementById('quizOptions');
            optsDiv.innerHTML = '';
            questions[currentQuestion].options.forEach((opt, i) => {
                optsDiv.innerHTML += `<div class="quiz-option" onclick="selectOption(${i})">${opt}</div>`;
            });
            document.getElementById('quizProgress').style.width = ((currentQuestion / questions.length) * 100) + '%';
        } else {
            showResult(index);
        }
    }, 300);
}

function showResult(finalIndex) {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('skinType').textContent = results[finalIndex].type;
    document.getElementById('skinDescription').textContent = results[finalIndex].desc;
}

// --- Modal Functions ---
function openModal(type) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    modal.classList.add('active');
    
    if (type === 'privacy') {
        body.innerHTML = `<h2>Privacy Policy</h2><p>Your privacy is important to us. This Privacy Policy explains how Dr. Sayantika Dutta's clinic collects, uses, and protects your personal information.</p><h3>Information We Collect</h3><p>We collect information you provide directly to us, including your name, contact information, medical history, and treatment preferences.</p><h3>Data Security</h3><p>We implement appropriate technical and organizational measures to protect your personal information.</p>`;
    } else if (type === 'terms') {
        body.innerHTML = `<h2>Terms of Service</h2><p>By using our services, you agree to these terms. Please read them carefully.</p><h3>Appointments</h3><p>Please arrive 10 minutes early. Late arrivals may result in shortened appointments.</p><h3>Cancellation</h3><p>We require 24-hour notice for cancellations.</p>`;
    } else if (type.startsWith('blog')) {
        body.innerHTML = `<h2>Blog Article</h2><p>Full article content would appear here. This is a placeholder for the complete blog post.</p>`;
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// --- Cookie Consent ---
function showCookieBanner() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookieBanner').classList.add('active');
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieBanner').classList.remove('active');
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookieBanner').classList.remove('active');
}

// --- Chat Widget ---
function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('active');
}

function sendChat() {
    const input = document.getElementById('chatInput');
    if (input.value.trim()) {
        const body = document.querySelector('.chat-body');
        body.innerHTML += `<div class="chat-message" style="text-align: right; background: var(--gold); color: var(--pearl);"><strong>You:</strong><br>${input.value}</div>`;
        input.value = '';
        setTimeout(() => {
            body.innerHTML += `<div class="chat-message"><strong>Clinic Assistant:</strong><br>Thank you for your message. We'll get back to you shortly!</div>`;
            body.scrollTop = body.scrollHeight;
        }, 1000);
    }
}

// --- Newsletter ---
function subscribeNewsletter(e) {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for confirmation.');
    e.target.reset();
}

// --- PDF Downloads ---
function downloadPDF(type) {
    alert(`Downloading ${type}.pdf... (In production, this would download actual PDF files)`);
}

// --- Gift Card Selection ---
function selectGift(amount) {
    const amounts = document.querySelectorAll('.gift-amount');
    amounts.forEach(amt => amt.classList.remove('selected'));
    event.target.classList.add('selected');
    if (amount === 0) {
        const custom = prompt('Enter custom amount:');
        if (custom) alert(`Gift card of ₹${custom} selected!`);
    } else {
        alert(`Gift card of ₹${amount} selected!`);
    }
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// --- Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => revealObserver.observe(el));

// --- Initialize ---
window.addEventListener('load', () => {
    showCookieBanner();
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
