const menuButton = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const galleryImages = document.querySelectorAll(".gallery img");

function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
  const breakpoint = 900; 
  if (window.innerWidth > breakpoint) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize(); 
window.addEventListener("resize", handleResize);

function openViewer(imageSrc, imageAlt) {
    const dialog = document.createElement('dialog');
    const largeSrc = imageSrc.replace('-sm', '-lg'); 

    dialog.innerHTML = `
        <div class="viewer-content">
            <img src="${largeSrc}" alt="${imageAlt} (large view)">
            <button class='close-viewer' aria-label="Close image viewer">X</button>
        </div>
    `;

    document.body.appendChild(dialog);

    const modalImage = dialog.querySelector('img');

    modalImage.onerror = function() {
        modalImage.src = imageSrc; 
        modalImage.onerror = null; 
    };

    dialog.showModal();

    function closeViewer() {
        dialog.close();
        dialog.remove(); 
    }

    const closeButton = dialog.querySelector('.close-viewer');
    closeButton.addEventListener('click', closeViewer);

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            closeViewer();
        }
    });
}

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        
        openViewer(src, alt);
    });
});