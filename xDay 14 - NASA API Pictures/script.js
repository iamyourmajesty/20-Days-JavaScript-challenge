const resultNav = document.getElementById('result-nav');
const favoriteNav = document.getElementById('favorites-nav')
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA APOD API URL
const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favoritesObj = {}; 

//show content
function showContent(page) {
    window.scrollTo({top :0,behavior:"instant"});
    if(page === 'results' ) {
        resultNav.classList.remove('hidden');
        favoriteNav.classList.add('hidden');
    }else {
        resultNav.classList.add('hidden');
        favoriteNav.classList.remove('hidden');
    }
    loader.classList.add('hidden');
}
function createDomNodes(page) {
    // for each works for array , so Object.values() converts object to array
    const currArray = page === 'results' ? resultsArray : Object.values(favoritesObj);
    currArray.forEach((result) =>{
        //car container
        const card = document.createElement('div');
        card.classList.add('card');
        //Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        //Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy'; // for lazy loading
        image.classList.add('card-img-top');
        //card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        //card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        //save text / remove text
        const saveText = document.createElement('p');
        if(page === 'results') {
            saveText.classList.add('clickable');
            saveText.textContent = 'Add to Favorites';
                    //when Add to favorites is clicked
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
        }
        else {
            saveText.classList.add('clickable');
            saveText.textContent = 'Remove From Favorites';
                    //when Remove from favorites is clicked
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }


        //card Text 
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        //Footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        //Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        
        //append : order of child matters when you append
        //appendChild : for one child
        footer.appendChild(date);
        cardBody.append(cardTitle,saveText,cardText,footer);
        link.appendChild(image);
        card.append(link,cardBody);
        // console.log(card);
        imagesContainer.appendChild(card);
    });
}


// Update DOM
function UpdateDOM(page) {
    //get objects from local storage
    if(localStorage.getItem('nasaFavorites'))
    {
        favoritesObj = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    //refresh every time
    imagesContainer.textContent = '';


    createDomNodes(page);
    showContent(page);

}


// get 10 images from api
async function getNasaPicutre() {
    //show Loader
    loader.classList.remove('hidden');

    try {
        const response = await fetch(apiUrl);
        //populate data in resultArray
        resultsArray = await response.json();
        // console.log(resultsArray);
        UpdateDOM('results');
    }catch(err) {
        //errror
        console.log('Ops! ',err);
    }
}

// SAVE to FavoriteObj
function saveFavorite(itemUrl){
    // console.log(itemUrl);
    //Loop through Result Array to select Favorite
    resultsArray.forEach((item) =>{
        if(item.url.includes(itemUrl) && !favoritesObj[itemUrl]) {
            favoritesObj[itemUrl] = item;
            // console.log(favoritesObj);
            //Show save confirmed
            saveConfirmed.hidden = false;
            setTimeout(()=>{
                saveConfirmed.hidden= true;
            },2000);

            // save obj in localStorage
            localStorage.setItem('nasaFavorites',JSON.stringify(favoritesObj));
        }
    })
}

// Remove item from FavoriteObj
function removeFavorite(itemUrl) {
    if(favoritesObj[itemUrl])
    {
        delete favoritesObj[itemUrl];
        // save updated obj in localStorage
        localStorage.setItem('nasaFavorites',JSON.stringify(favoritesObj));
        //updateDom
        UpdateDOM('favorites')
    }
}


getNasaPicutre();