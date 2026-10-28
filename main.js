let isOpened = false;

// 1. Logika Buka Undangan
function openInvitation() {
    if (isOpened) return;
    isOpened = true;

    const envelope = document.getElementById('envelope');
    const coverOverlay = document.getElementById('cover-overlay');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-btn');
    const music = document.getElementById('bg-music');

    // Angkat kartu surat
    envelope.classList.add('open');
    mainContent.classList.remove('d-none');
    musicBtn.classList.remove('d-none');

    // Play Backsound Audio
    if (music) {
        music.play().then(() => {
            musicBtn.classList.add('spin');
        }).catch(err => console.log("Audio autoplay prevented or file missing:", err));
    }

    // Fade out cover overlay setelah 0.8 detik
    setTimeout(() => {
        coverOverlay.classList.add('fade-out');
        triggerInitialReveal();
    }, 800);
}

// Toggle Play/Pause Musik
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');

    if (music.paused) {
        music.play();
        musicBtn.classList.add('spin');
        musicIcon.className = "bi bi-music-note-beamed fs-5";
    } else {
        music.pause();
        musicBtn.classList.remove('spin');
        musicIcon.className = "bi bi-volume-mute-fill fs-5";
    }
}

// 2. Generator Kelopak Bunga Jatuh
function createPetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const numberOfPetals = 18; // Jumlah kelopak bunga

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Bikin kelopak bunga pakai SVG melengkung yang cantik
        petal.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C15 0 25 8 25 18C25 24 20 28 15 28C10 28 5 24 5 18C5 8 15 0 15 0Z" fill="#ffb7c5" opacity="0.85"/>
            </svg>
        `;

        // Posisi acak & variasi kecepatan jatuh
        const startX = Math.random() * 100; // Posisi horizontal (0 - 100%)
        const size = Math.random() * 12 + 14; // Ukuran bervariasi
        const duration = Math.random() * 5 + 6; // Durasi jatuh 6s - 11s
        const delay = Math.random() * 5; // Jeda muncul acak

        petal.style.left = `${startX}%`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        container.appendChild(petal);
    }
}

// 3. Ambil Parameter Nama Tamu dari URL (?to=NamaTamu)
window.addEventListener('DOMContentLoaded', () => {
    createPetals(); // Jalankan efek bunga jatuh saat halaman dimuat

    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        document.getElementById('guest-name').innerText = guestParam;
    }
});

// 4. Logika Countdown Timer
const eventDate = new Date("Jan 1, 2027 08:00:00").getTime();
const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(timer);
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// 5. RSVP Form ke WhatsApp
document.getElementById('rsvp-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;

    const phoneNumber = "6281"; // Ganti dengan nomor WhatsApp tujuan

    const text = `Halo, saya *${name}*\nStatus Kehadiran: *${attendance}*\n\n*Pesan & Doa:*\n"${message}"`;
    const encodedText = encodeURIComponent(text);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
});

// 6. IntersectionObserver untuk Animasi Scroll Reveal
const observerOptions = {
    root: null,
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function triggerInitialReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
}