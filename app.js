document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.testimonials-container');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to update carousel position
    function updateCarousel() {
        container.style.transform = `translateX(${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-advance slides every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause auto-advance when user interacts with carousel
    const carouselContainer = document.querySelector('.testimonials-carousel');
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            nextSlide();
        } else if (e.key === 'ArrowRight') {
            prevSlide();
        }
    });
});