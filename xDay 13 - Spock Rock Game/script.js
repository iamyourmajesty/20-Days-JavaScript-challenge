import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';


const playerScoreEl  = document.getElementById('player-score');
const playerChoiceEl = document.getElementById('player-choice');

const computerScoreEl  = document.getElementById('computer-score');
const computerChoiceEl = document.getElementById('computer-choice');

const resultText = document.getElementById('result-text');

const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const playerLizard = document.getElementById('player-lizard');
const playerSpock = document.getElementById('player-spock');

const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const computerLizard = document.getElementById('computer-lizard');
const computerSpock = document.getElementById('computer-spock');


// select all game icons
const allGameIcons = document.querySelectorAll('.far');

let computerChoice = '';
let  Choices = ['rock','paper','scissors','lizard','spock'];

let playerScore = 0;
let computerScore = 0;

// Game Logic 
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// Reset all selected icons 
function resetSelected () {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });

  stopConfetti();
  removeConfetti();
}

//Reset Score and playerChoice / computerChoice
function resetAll() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;

  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = "";
  resetSelected();
}
window.resetAll = resetAll;

//Computer Random Selection 
function computerRandomChoice() {
  const randomNum = Math.floor(Math.random()*5);
 
  computerChoice = Choices[randomNum];
  
  // console.log(computerChoice);
}

// Add selected styling on computer choice  
function displayComputerChoice() {
  
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// checkResult , increase Scores, update resultText 
function updateScore(playerChoice) {
  if(playerChoice === computerChoice)
  {
    //tie
    resultText.textContent = "It's a tie.";
  }
  else{
    const choice = choices[playerChoice];
    // console.log(choice.defeats[0],choice.defeats[1]);
    if(computerChoice === choice.defeats[0] || computerChoice === choice.defeats[1])
    {
      // console.log('You Won!');
      resultText.textContent = "You Won!";
      startConfetti();
      playerScore++;
      playerScoreEl.textContent = playerScore;
    }
    else{
      // console.log("computer won!");
      resultText.textContent = "You Lost!";
      computerScore++;
      computerScoreEl.textContent = computerScore;
    }
  }


}


function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);

}



// player selection and styling icons 
function select(playerChoice) {
  // console.log(playerChoice);
  checkResult(playerChoice);
  // Add selected styling and updatePlayerChoice 
  switch(playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
          

  }
  
}
window.select = select;


resetAll();

