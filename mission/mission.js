let selectElem = document.querySelector('select');
let body = document.body;
let container = document.querySelector('.container');
let byu = document.querySelector('.byu');
let idaho = document.querySelector('.idaho');
let h2 = document.querySelector('h2');
selectElem.addEventListener('change', changeTheme);

function changeTheme() {
  let current = selectElem.value;

  if (current === 'dark') {
    body.style.backgroundColor = '#333';
    body.style.color = 'white';
    container.style.backgroundColor = '#444';
    container.style.borderColor = '#555';
    byu.style.color = 'white';  
    idaho.style.color = 'white';
    h2.style.color = '#87cefa';
    document.documentElement.style.setProperty('--line-color', 'white');
  } 
  else if (current === 'light') {
    body.style.backgroundColor = ''; 
    body.style.color = '';
    container.style.backgroundColor = '';
    container.style.borderColor = '';
    byu.style.color = ''; 
    idaho.style.color = '';
    h2.style.color = '';
    document.documentElement.style.setProperty('--line-color', '');
  } 
  else {
    body.style.backgroundColor = '';
    body.style.color = '';
    container.style.backgroundColor = '';
    container.style.borderColor = '';
    byu.style.color = '';
    idaho.style.color = '';
  }
}
