
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const key = 'iVtqce0xVRpikxB7-BeBe2wbKH9ljn8dteUhNNvfrkU'; 
// get you own key from unsplash api


// we will fetch the images using specifice api
let count = 15;

// const url=`https://picsum.photos/v2/list?page=2&limit=${count}`;
const url = `https://api.unsplash.com/photos/?client_id=${key}&limit=${count}`

// check if images were loaded
function imageLoaded() {
    // console.log('image loaded');

    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('ready',ready);

        // to increase performance we load only 15 photos at start
        count = 30;
        url = `https://api.unsplash.com/photos/?client_id=${key}&limit=${count}

        
    }
}
// create Element for links and photos , add to dom 
function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images ',totalImages);

    photosArray.forEach((photo)=>{
        // create a to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        

        //create image
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        
        img.addEventListener('load',imageLoaded);

        // put img inside <a> 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



async function getPhotos()
{
    try{
        const response = await fetch(url);
        photosArray = await response.json();

        displayPhotos();
        
    }
    catch(err)
    {
        console.log(err);
    }
}

//when you reach the bottom add more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        getPhotos();
        
    }
})

getPhotos();