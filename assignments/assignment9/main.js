const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['images/pic1.jpg','images/pic2.jpg','images/pic3.jpg','images/pic4.jpg','images/pic5.jpg'];

/* Declaring the alternative text for each image file */
const altText = ['an eye', 'striated rock', 'white and purple flowers', 'egyptian murals', 'a butterfly'];

function changeDisplay(newImage, imgSrc, imgAlt){
    const newMain = document.querySelector('.displayed-img')
    newMain.setAttribute('src', imgSrc);
    newMain.setAttribute('alt', imgAlt);
}

function adjustButton(){
    let currentMode = btn.getAttribute('class');

    if(currentMode === 'dark'){
        btn.setAttribute('class','light');
        btn.textContent = 'Lighten'
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    
    }else{
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}

/* Looping through images */
let arrayLength = images.length;
for(let i = 0; i < arrayLength; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', images[i]);
    newImage.setAttribute('alt', altText[i]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', ()=>changeDisplay(newImage, images[i], altText[i]));
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', ()=>adjustButton());