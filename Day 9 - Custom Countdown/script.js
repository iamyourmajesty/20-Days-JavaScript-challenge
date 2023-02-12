const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dataElement = document.getElementById('date-picker');

const countdownElement = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeElement = document.getElementById('complete');
const completeElementInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000; //in miliseconds
const minute = second * 60;
const hour = minute *60;
const day = hour * 24;

// set Date input :  Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dataElement.setAttribute('min',today);

// Populate countdown/ complete ui
function updateDOM() {

    countdownActive = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownValue - now ;
    
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/minute);
        const seconds = Math.floor((distance % minute)/second);
    
        // console.log(days,hours,minutes,seconds);

        //hide input
        inputContainer.hidden = true;

        // is countdown completed
        if(distance < 0)
        {
            countdownElement.hidden = true;
            clearInterval(countdownActive);
            completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        }
        else {
            // show countdown progress

              //Populate countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent =`${days}`;
        timeElements[1].textContent =`${hours}`;
        timeElements[2].textContent =`${minutes}`;
        timeElements[3].textContent =`${seconds}`;

        completeElement.hidden  = true;
        
        //show countdown 
        countdownElement.hidden = false;
        }
    
      

    },second);

   
}

//Take values from form
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //save data to local storage
    savedCountdown = {
        title : countdownTitle,
        date : countdownDate
    };
    // json.stringify() is used to convert the javascript object to json object , since we can't save javascript object in any server
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));


    //check for valid date
    if(countdownDate === '') {
        alert("Ops! you did't selected the date");
    }
    else{
        //get number version of current Date and updateDom
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
    
}

// Reset all values
function reset() {
    //Hide count , show Input 
    countdownElement.hidden = true;
    completeElement.hidden = true;
    inputContainer.hidden = false;

    localStorage.removeItem('countdown');

    // stop countdown
    clearInterval(countdownActive);

    //Reset values
    countdownTitle = '';
    countdownDate = '';
}

function restorePrevCountdown() {
    // get data from localstorage
    if(localStorage.getItem('countdown'))
    {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));

        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;

        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}






//Add EventListner
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

// on load , check local storage
restorePrevCountdown();