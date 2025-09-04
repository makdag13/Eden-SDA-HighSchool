/* ---------------------------- Mobile Navigation ---------------------------- */
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const navMenu = document.querySelector('.header nav ul');

menuIcon.addEventListener('click', () => {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.opacity = '0';
    navMenu.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { navMenu.style.opacity = '1'; }, 10);

    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
});

closeIcon.addEventListener('click', () => {
    navMenu.style.opacity = '0';
    setTimeout(() => {
        navMenu.style.display = 'none';
    }, 300);

    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
});

/* ---------------------------- Slider ---------------------------- */
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transition = 'opacity 0.5s ease';
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');
    setTimeout(() => slides[index].style.opacity = '1', 50);
    currentIndex = index;
}

prev.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoSlide();
});

next.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoSlide();
});

function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

slides.forEach(slide => {
    slide.addEventListener('mouseenter', stopAutoSlide);
    slide.addEventListener('mouseleave', startAutoSlide);
});

showSlide(currentIndex);
startAutoSlide();

/* ---------------------------- Lightbox ---------------------------- */
const images = document.querySelectorAll('.gallery-images img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .lightbox-prev');
const nextBtn = document.querySelector('.lightbox .lightbox-next');
let currentImageIndex = 0;

function showImage() {
    lightboxImg.src = images[currentImageIndex].src;
}

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        showImage();
        lightbox.style.display = 'flex';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        setTimeout(() => lightbox.style.opacity = '1', 10);
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.opacity = '0';
    setTimeout(() => lightbox.style.display = 'none', 300);
});

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    }
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBtn.click();
});
