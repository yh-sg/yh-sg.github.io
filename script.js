//All global variables
let chosenColorArray = [];
let randomColorArray = [];

let score = -1;
let classicHighestScore = 0;
let reverseHighestScore = 0;
let easyHighestScore = 0;
let shuffleHighestScore = 0;

let gameStart = false;
let preventSpamClick = false;
let classic = false;
let reverse = false;
let easy = false;
let shuffle = false;

let arrayButtonColor = ["yellow", "blue", "red", "green"];

//DOM Manipulation
let modeSelector = document.querySelectorAll("button");
let buttons = document.querySelectorAll(".btn");
let h1 = document.querySelectorAll("h1");
let container = document.getElementById("container");

//Start the game!!! initialize the game
document.body.addEventListener("keypress", function () {
  if (!gameStart && (classic || reverse || easy || shuffle)) {
    setTimeout(() => {
      nextRandomColor();
      gameStart = true;
    }, 800);
  }
});

//difficulty Buttons
for (let i = 0; i < modeSelector.length; i++) {
  modeSelector[i].addEventListener("click", function () {
    if (
      this.innerText === "CLASSIC" ||
      this.innerText === "REVERSE" ||
      this.innerText === "EASY" ||
      this.innerText === "SHUFFLE"
    ) 
    {
      modeSelector[0].classList.remove("selected");
      modeSelector[1].classList.remove("selected");
      modeSelector[2].classList.remove("selected");
      modeSelector[3].classList.remove("selected");
      this.classList.add("selected");
    }
    //console.log(this.innerText);

    if (this.innerText === "CLASSIC" && score === -1) {
      classic = true;
      reverse = false;
      easy = false;
      shuffle = false;
    } else if (this.innerText === "REVERSE" && score === -1) {
      classic = false;
      reverse = true;
      easy = false;
      shuffle = false;
    } else if (this.innerText === "EASY" && score === -1) {
      classic = false;
      reverse = false;
      easy = true;
      shuffle = false;
    } else if (this.innerText === "SHUFFLE" && score === -1) {
      classic = false;
      reverse = false;
      easy = false;
      shuffle = true;
    }
  });
}

//Secondary buttons
document.querySelector(".toggle").addEventListener("click", function () {
  assignRandomColors();
});

document.querySelector(".revert").addEventListener("click", function () {
  revertColors();
});

document.querySelector(".restart").addEventListener("click", function () {
  document.querySelector("#score").innerHTML =
    "<h1>Restart!<br> Click on the mode and press any keyboard button to restart.</h1>";
  reset();
  soundEffect("restart");
});

//Game instructions button
document.querySelector(".instruction").addEventListener("click",function () {
  document.querySelector(".modal").style.display = "block";

  document.querySelector(".close").addEventListener("click", function(e){
    document.querySelector(".modal").style.display = "none";
  });
});

//When clicked, get the color and add into array,color clicking
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function name() {
    if (gameStart) {
      if (preventSpamClick) {
        return;
      }

      preventSpamClick = true;

      let chosenColor = this.getAttribute("id");
      chosenColorArray.push(chosenColor);

      pressAnimation(chosenColor);
      soundEffect(chosenColor);

      checkPattern(chosenColorArray.length - 1);

      setTimeout(() => {
        preventSpamClick = false;
      }, 450);
    }
  });
}

//check if user is clicking according to the pattern
function checkPattern(currentPattern) {
  console.log(randomColorArray);
  if (randomColorArray[currentPattern] === chosenColorArray[currentPattern]) {
    console.log(chosenColorArray);
    if (chosenColorArray.length === randomColorArray.length) {
      setTimeout(() => {
        nextRandomColor();
      }, 500);
    }
  } else {
    highScoreUpdate();
    document.querySelector("#score").innerHTML =
      "<h1>Game Over! <br> Click on the mode and press any keyboard button to restart.</h1>";
    document.querySelector("body").classList.add("gameover");
    setTimeout(() => {
      document.querySelector("body").classList.remove("gameover");
    }, 300);
    reset();
    soundEffect("gameover");
  }
}

//Pick a random color and save the color pattern
function nextRandomColor() {
  chosenColorArray = []; //Important, reset user pattern for every new input
  score++;

  // document.querySelector(".space").innerHTML =
  //   "Score: " + score;
    document.querySelector(".space").innerHTML =
      score;
    if(classic){
      document.querySelector("#score").innerHTML =
      `<h1><i class="fas fa-meteor"></i>&nbsp;&nbsp;The Simon Game!!&nbsp;&nbsp;<i class="fas fa-meteor"></i> <br> Score to Beat: ` + classicHighestScore + `</h1>`;
    }else if(reverse){
      document.querySelector("#score").innerHTML =
      `<h1><i class="fas fa-meteor"></i>&nbsp;&nbsp;The Simon Game!!&nbsp;&nbsp;<i class="fas fa-meteor"></i> <br> Score to Beat: ` + reverseHighestScore + `</h1>`;
    }else if(easy){
      document.querySelector("#score").innerHTML =
      `<h1><i class="fas fa-meteor"></i>&nbsp;&nbsp;The Simon Game!!&nbsp;&nbsp;<i class="fas fa-meteor"></i> <br> Score to Beat: ` + easyHighestScore + `</h1>`;
    }else if(shuffle){
      document.querySelector("#score").innerHTML =
      `<h1><i class="fas fa-meteor"></i>&nbsp;&nbsp;The Simon Game!!&nbsp;&nbsp;<i class="fas fa-meteor"></i> <br> Score to Beat: ` + shuffleHighestScore + `</h1>`;
    }

  let randomColor = Math.floor(Math.random() * 4);
  let randomColorSelected = arrayButtonColor[randomColor];

  if (classic || easy || shuffle) {
    randomColorArray.push(randomColorSelected);
  } else if (reverse) {
    randomColorArray.unshift(randomColorSelected);
  }

  if (classic || reverse) {
    pressAnimation(randomColorSelected);
    soundEffect(randomColorSelected);
  } else {
    gameStart = false;

    for (let i = 0; i < randomColorArray.length; i++) {
      setTimeout(() => {
        console.log(gameStart);
        pressAnimation(randomColorArray[i]);
        soundEffect(randomColorArray[i]);
      }, i * 500);

      setTimeout(() => {
        gameStart = true;
        if (shuffle) {
          shuffleDiv();
        }
      }, randomColorArray.length * 500);
    }
  }
}

function pressAnimation(chosenColor) {
  document.querySelector("#" + chosenColor).classList.add("pressedAnimation");
  setTimeout(function () {
    document
      .querySelector("#" + chosenColor)
      .classList.remove("pressedAnimation");
  }, 300);
}

function reset() {
  score = -1;
  randomColorArray = [];
  gameStart = false;
  modeSelector[0].classList.remove("selected");
  modeSelector[1].classList.remove("selected");
  modeSelector[2].classList.remove("selected");
  modeSelector[3].classList.remove("selected");
  classic = false;
  reverse = false;
  easy = false;
  shuffle = false;
  document.querySelector(".space").innerHTML = "";
}

function soundEffect(color) {
  let soundEffect = new Audio("soundEffect/" + color + ".mp3"); // buffers automatically when created
  soundEffect.play();
}

function randomColors() {
  //pick a "color" from 0 to 255
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function colorArray() {
  let array = [];
  for (let i = 0; i < 4; i++) {
    array.push(randomColors());
  }
  return array;
}

function assignRandomColors() {
  let colors = colorArray();
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = colors[i];
  }
}

function revertColors() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute("style");
  }
}

function highScoreUpdate(){
  if(classic&&score>classicHighestScore){
      classicHighestScore = score; 
  } else if(reverse && score>=reverseHighestScore){
    reverseHighestScore = score;
  }else if(easy && score>=easyHighestScore){
    easyHighestScore = score;
  }else if(shuffle && score>=shuffleHighestScore){
    shuffleHighestScore = score;
  }
}

//start from the last element, swap it with a randomly selected element from the whole array (including last)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--)  {
    // Target the random index position 
    let j = Math.floor(Math.random() * (i + 1));
    
    // Swap the targeted index with the random index
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

  }
  return array;
}

function shuffleDiv() {
  //array object as a method
  //With call(), an object can use a method belonging to another object which is the array.
  let elementsArray = Array.prototype.slice.call(document.querySelectorAll(".btn"));
  console.log(elementsArray);
  elementsArray.forEach(element => {
    container.removeChild(element);
  });
  shuffleArray(elementsArray);
  elementsArray.forEach(element => {
    container.appendChild(element);
  });
}