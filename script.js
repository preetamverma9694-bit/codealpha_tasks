// Dom Element Selectors
const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let visibleImages = [];

// Helper function to update the array of currently active/filtered images
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}
updateVisibleImages();

// --- LIGHTBOX INTERACTION & NAVIGATION ---
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        // Track index relative to visible filtered items
        currentIndex = visibleImages.indexOf(item);
        showLightbox(item.querySelector('img').src);
    });
});

function showLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function nextImage() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].querySelector('img').src;
}

function prevImage() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].querySelector('img').src;
}

// Event Listeners for controls
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Close if user clicks background shade
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});


// --- BONUS: CATEGORY FILTER FUNCTIONALITY ---
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Active button styling switch
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });

        // Sync lightbox map with newly filtered items list
        updateVisibleImages();
    });
});
