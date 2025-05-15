// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Testimonial slider functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;

    function updateTestimonials() {
        const offset = -currentIndex * 100; // Each card takes 100% width
        testimonialTrack.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonialCards.length - 1) {
            currentIndex++;
            updateTestimonials();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTestimonials();
        }
    });

    // Add click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonials();
        });
    });
});

// Form Submission code
// Form Submission code
// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('project-form');
    
//     if (form) {
//         form.addEventListener('submit', async function(e) {
//             e.preventDefault();
            
//             const formData = {
//                 fullName: document.querySelector('[name="fullName"]').value,
//                 email: document.querySelector('[name="email"]').value,
//                 phone: document.querySelector('[name="phone"]').value,
//                 businessName: document.querySelector('[name="businessName"]').value,
//                 serviceInterested: document.querySelector('[name="serviceInterested"]').value,
//                 projectDetails: document.querySelector('[name="projectDetails"]').value
//             };
            
//             console.log("Form data being submitted:", formData); // For debugging
            
//             try {
//                 // Update to your actual server URL (localhost for local development)
//                 const response = await fetch('http://192.168.29.174:3000/api/submit-inquiry', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 });
                
//                 const result = await response.json();
                
//                 if (response.ok) {
//                     alert('Thank you for your inquiry! We will contact you soon.');
//                     form.reset();
//                 } else {
//                     alert('Something went wrong: ' + result.message);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('Failed to submit form. Please make sure the server is running.');
//             }
//         });
//     } else {
//         console.error("Form with ID 'project-form' not found");
//     }
// });

// const messaging = firebase.messaging();

// messaging.requestPermission()
//   .then(() => messaging.getToken())
//   .then((token) => {
//     alert('Your token is: ' + token);
//     // Send this token to your server or save it manually
//   })
//   .catch((err) => {
//     alert('Error getting token: ' + err);;
//   });