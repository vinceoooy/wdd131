let selectElem = document.querySelector('select');
let logo = document.querySelector('.logo');
let content = document.querySelector('.content');
let body = document.body;

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current === 'dark') {
        // Dark mode styles
        body.style.backgroundColor = '#121212';
        body.style.color = '#EAEAEA';
        content.style.borderColor = '#333';
        content.style.backgroundColor = '#1E1E1E';
        logo.src = 'logo_dark.png';
    } else if (current === 'light') {
        // Light mode styles
        body.style.backgroundColor = '#FFFFFF';
        body.style.color = '#000000';
        content.style.borderColor = '#E1E1E1';
        content.style.backgroundColor = '#FFFFFF';
        logo.src = 'logo.webp';
    } else {
        // Default (Choose Mode selected)
        body.style.backgroundColor = '';
        body.style.color = '';
        content.style.borderColor = '';
        content.style.backgroundColor = '';
        logo.src = 'logo.webp';
    }
}
