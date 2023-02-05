const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// we will fetch the images using specifice api
let count = 15;
let page=Math.floor(Math.random()*50 );
const url=`https://picsum.photos/v2/list?page=${page}&limit=${count}`;

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
        page= Math.floor(Math.random()*50 );
        url=`https://picsum.photos/v2/list?page=${page}&limit=${count}`;

        
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
        item.setAttribute('href',photo.download_url);
        

        //create image
        const img = document.createElement('img');
        img.setAttribute('src',photo.download_url);
        
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