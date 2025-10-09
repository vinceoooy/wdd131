// Select important elements
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Open modal when a thumbnail is clicked
gallery.addEventListener('click', openModal);

function openModal(e) {
    // Only respond if an image is clicked
    if (e.target.tagName !== 'IMG') return;

    // Replace '-sm' with '-full' if you have high-res versions
    // Otherwise, just reuse the same image
    const fullSrc = e.target.src.includes('-sm')
        ? e.target.src.replace('-sm', '-full')
        : e.target.src;

    modalImage.src = fullSrc;
    modalImage.alt = e.target.alt;

    // Show modal
    modal.showModal();
}

// Close modal on 'X' button
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Close modal with Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.close();
    }
});
