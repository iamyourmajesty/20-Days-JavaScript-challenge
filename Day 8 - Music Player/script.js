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
        artist : 'Luis Fonsi',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676119287/New/song_1_othth6.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676119493/New/image_1_trrqyd.jpg'
    },
    {
        count : '2',
        displayName : "Don't Let Me Down",
        artist : 'The Chainsmokers',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676119394/New/song_2_avvx8m.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676119494/New/image_2_ecmvb5.jpg'
    },
    {
        count : '3',
        displayName : 'Memories',
        artist : 'Maroon 5',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676119332/New/song_3_wiq52p.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676119494/New/image_3_wfxbcw.jpg'
    },
    {
        count : '4',
        displayName : 'Paradise',
        artist : 'Coldplay',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676119044/New/song_4_tv2itp.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676119496/New/image_4_srblv6.webp'
    },
    {
        count : '5',
        displayName : 'Peaches',
        artist : 'Justin Bieber',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676119438/New/song_5_qmd37f.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676119496/New/image_5_us5bwl.jpg'
    },
    {
        count : '6',
        displayName : "Shape of You",
        artist : 'Ed Sheeran',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676124952/New/song_6_rhkdcg.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676123650/New/image_6_wul3pg.jpg'
    },
    {
        count : '7',
        displayName : "Let Me Love You",
        artist : 'DJ Snake',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676123685/New/song_7_tvb9yo.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676123650/New/image_7_pwc2ud.jpg'
    },
    {
        count : '8',
        displayName : "I'm the One",
        artist : 'Justin Bieber',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676123724/New/song_8_x5ckpg.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676123650/New/image_8_ntxli5.jpg'
    },
    {
        count : '9',
        displayName : "Faded",
        artist : 'Alan Walker',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676123683/New/song_9_v3rucv.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676123650/New/image_9_viosuf.jpg'
    },
    {
        count : '10',
        displayName : "Replay",
        artist : 'Iyaz',
        songUrl : 'https://res.cloudinary.com/du1n94yvw/video/upload/v1676123744/New/song_10_vjhesg.mp3',
        imgUrl : 'https://res.cloudinary.com/du1n94yvw/image/upload/v1676123650/New/image_10_jcjuq9.jpg'
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
    
    Audio.src = song.songUrl;
    image.src = song.imgUrl;
}

//current song
let songIndex = 0;

// on load - select first song 
loadSong(Audios[songIndex]);