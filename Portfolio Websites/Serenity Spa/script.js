window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');

mobileNavToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileNavToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileNavToggle.textContent = '☰';
    });
});

// Testimonials slider
const track = document.getElementById('testimonials-track');
const slides = document.querySelectorAll('.testimonial-slide');
const nextButton = document.getElementById('next-testimonial');
const prevButton = document.getElementById('prev-testimonial');
let currentIndex = 0;

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

// Auto rotate testimonials
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}, 5000);

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    bookingModal.classList.add('show');
    
    // Reset form
    bookingForm.reset();
});

closeModal.addEventListener('click', function() {
    bookingModal.classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('show');
    }
});