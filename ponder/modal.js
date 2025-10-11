const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', openModal);

function openModal(e) {
    if (e.target.tagName !== 'IMG') return;

    const fullSrc = e.target.src.includes('-sm')
        ? e.target.src.replace('-sm', '-full')
        : e.target.src;

    modalImage.src = fullSrc;
    modalImage.alt = e.target.alt;

    modal.showModal();
}

closeButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.close();
    }
});
