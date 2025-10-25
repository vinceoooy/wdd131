let selectElem = document.querySelector('select');
let logo = document.querySelector('.logo');
let body = document.body;

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        // Add dark theme styles
        body.classList.add('dark');
        body.style.backgroundColor = '#333';  // dark gray background
        body.style.color = 'white';           // white text
        logo.src = 'logo_dark.png';           // switch to dark logo
    } else if (current === 'light') {
        // Switch back to light theme
        body.classList.remove('dark');
        body.style.backgroundColor = '#FFFFFF';
        body.style.color = '#000000';
        logo.src = 'logo.webp';
    } else {
        // Default (Choose Mode selected)
        body.classList.remove('dark');
        body.style.backgroundColor = '';
        body.style.color = '';
        logo.src = 'logo.webp';
    }
}
