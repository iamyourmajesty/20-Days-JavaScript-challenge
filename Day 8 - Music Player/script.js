const image = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const Audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currEl = document.getElementById('curr');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// to check whether audio is playing or pause
let isPlaying = false;

const Audios = [
    {
        count : '1',
        displayName : 'Despacito',
        artist : 'Luis Fonsi'
    },
    {
        count : '2',
        displayName : "Don't Let Me Down",
        artist : 'The Chainsmokers'
    },
    {
        count : '3',
        displayName : 'Memories',
        artist : 'Maroon 5'
    },
    {
        count : '4',
        displayName : 'Paradise',
        artist : 'Coldplay'
    },
    {
        count : '5',
        displayName : 'Peaches',
        artist : 'Justin Bieber'
    }
];


// Play Function
function playAudio() {
    
    // change playBtn to PauseBtn
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');

    isPlaying = true;
    Audio.play();
}

// Pause Fuction
function pauseAudio(){

    // change pauseBtn to playBtn
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    
    isPlaying = false;
    Audio.pause();
}

// Next function
function nextAudio() {
    songIndex++;
    if(songIndex > Audios.length - 1)
    {
        songIndex = 0;
    }
    loadSong(Audios[songIndex]);
    playAudio();

}

// Prev function
function prevAudio() {
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = Audios.length - 1;
    }
    loadSong(Audios[songIndex]);
    playAudio();

}

// Update progressBar and time 
function updateProgressBar(e) {
    if(isPlaying)
    {
        const {duration,currentTime} = e.srcElement;
       
        //update Progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width=`${progressPercent}%`;

        // calculate duration
        const durationInMin = Math.floor(duration/60); 
        let durationSec = Math.floor(duration%60);

        if(durationSec < 10)
        {
            durationSec = `0${durationSec}`;
        }
        

        //Delay switching duration Element to avoid Nan:Nan
        if(durationSec)
        {
            durationEl.textContent = `${durationInMin}:${durationSec}`

        }

        // calulate current time
        const currentMin = Math.floor(currentTime/60);
        let  currentSec = Math.floor(currentTime%60);

        if(currentSec < 10)
        {
            currentSec = `0${currentSec}`;
        }
         
        if(currentSec) {
            currEl.textContent = `${currentMin}:${currentSec}`;
        }



    }
}

// set progressBar
function setProgressBar(e) {
   
    const Width = this.clientWidth;
    const clickX = e.offsetX;
    
    const {duration} = Audio;
    
    Audio.currentTime = ((clickX/Width) * duration);
}



// Add EventListner 
playBtn.addEventListener('click',()=>{
    if(isPlaying)
    pauseAudio()
    else
    playAudio()
});

nextBtn.addEventListener('click',nextAudio);
prevBtn.addEventListener('click',prevAudio);

// when audio ends
Audio.addEventListener('ended',nextAudio);

Audio.addEventListener('timeupdate',updateProgressBar);

progressContainer.addEventListener('click',setProgressBar);

// play audio , if progress bar is clicked
progressContainer.addEventListener('click',playAudio);


// Update Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    Audio.src = `music/song_${song.count}.mp3`;
    image.src = `img/image_${song.count}.jpg`;
}

//current song
let songIndex = 0;

// on load - select first song 
loadSong(Audios[songIndex]);