const videoElement = document.getElementById('video');
const buttonElement = document.getElementById('button');

//promt to select media stream, pass to video element , the play
async function selectMediaStream(){
    try{
       const mediaStream = await navigator.mediaDevices.getDisplayMedia();
       videoElement.srcObject = mediaStream;
       videoElement.onloadedmetadata = () => {
            videoElement.play();
       }

    }
    catch(err) {
        console.log('You got a error ',err);

    }
}

async function pipOnButtonClick() {
    // disable button
    buttonElement.disabled = true;
    // start picture in picture
    await videoElement.requestPictureInPicture();
    //reset butoon
    buttonElement.disabled = false;

}

buttonElement.addEventListener('click',pipOnButtonClick)

// on load
selectMediaStream();

