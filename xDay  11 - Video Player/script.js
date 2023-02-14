const player = document.querySelector('.player');
const video = document.querySelector('video');
const ProgressRange = document.querySelector('.progress-range');
const ProgressBar = document.querySelector('.progress-bar');

const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');

const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');

const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const fullscreenBtn = document.querySelector('.fullscreen');

const speed = document.querySelector('.player-speed');

// Play & Pause 

function tooglePlay() {
    // to handel both play and pause
    if(video.paused) {
        video.play();
        //change icon and title of playBtn
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }
    else{
        video.pause();
        //change icon and title of playBtn
        playBtn.classList.replace('fa-pause','fa-play');
        playBtn.setAttribute('title','Play');
    }
}

// On video end : show play button icon to play again
video.addEventListener('ended',() => {
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
});

// Progress Bar  
//calculate display time format
function displayTime(time) {
    const min = Math.floor(time/60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;  
    return `${min}:${seconds}`;
}

//update progress bar
function updateProgress() {
    ProgressBar.style.width = `${(video.currentTime/video.duration) * 100}%`;

    //populate the current time and duration
    currentTime.textContent = `${displayTime(video.currentTime)}/`;;
    duration.textContent = `${displayTime(video.duration)}`;
    
}
// click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / ProgressRange.offsetWidth;
    ProgressBar.style.width = `${newTime * 100}%`;
    // video skip and go to newTime 
    video.currentTime = newTime * video.duration;

}

// Volume Controls 

let lastVolume = 1;

// Set Mute Icon
function setMuteIcon(){
    volumeIcon.className = '';
    volumeIcon.classList.add('fas','fa-volume-mute');
    volumeIcon.setAttribute('title','UnMute');
}
// Set Unmute
function setUnmuteIcon(vol){
    volumeIcon.className = ''; // removed all class of volume icon

    if(vol > 0.7) {
        volumeIcon.classList.add('fas','fa-volume-up');
    }
    else if(vol <= 0.7 && vol > 0)
    {
        volumeIcon.classList.add('fas','fa-volume-down');
    }
    else if(vol === 0)
    {
        volumeIcon.classList.add('fas','fa-volume-off');
    }
    volumeIcon.setAttribute('title','Mute');
}

//volume bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    //round volume
    if(volume < 0.1) {
        volume = 0;
    }
    else if(volume > 0.9) {
        volume  = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    //change volume icon depending upon volum
    setUnmuteIcon(volume);

    // storing volume in lastVolume 
    lastVolume = volume;

}
//Mute/Unmute
function toggleMute() {
    if(video.volume )
    {
        //unmute to mute
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;

        setMuteIcon();
        
    }
    else {
        //mute to unmute
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        
       setUnmuteIcon(lastVolume);
    }
}

// Change Playback Speed 

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen 


/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }
 
let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}


//Event Listners
playBtn.addEventListener('click',tooglePlay);
video.addEventListener('click',tooglePlay);

video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
ProgressRange.addEventListener('click',setProgress);

volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);

speed.addEventListener('change',changeSpeed);

fullscreenBtn.addEventListener('click',toggleFullscreen);

