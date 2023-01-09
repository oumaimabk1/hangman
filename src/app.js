import * as bootstrap from "bootstrap";

let failure = 0;
let str = "oumayma";
let chosenWord = str.toUpperCase();
const letterContainer = document.getElementById("letter-container");
//const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-test");

//count
let winCount = 0;
let count = 0;

//word generator
const generateWord = () => {
  userInputSection.innerHTML = "";
  letterContainer.classList.remove("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  //replace every letter with dash
  let displayItem = chosenWord.replace(
    /./g,
    "<span class='dashes'> __ </span>"
  );

  //display each element as span
  userInputSection.innerHTML = displayItem;
};
//initial function

//block all the buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  newGameContainer.classList.remove("hide");
};

const initializer = () => {
  winCount = 0;
  count = 0;
  generateWord();
  //creation letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      console.log(button.innerText);
      //if array contains clicked value replace the matched dash with letter else draw on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char == button.innerText) {
            //replace dashe with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            console.log(winCount);
            //win
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You win !!</h2>
                 <p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        if (count == 6) {
          setTimeout(()=>{
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose !!</h2>
            <p> The word was <span>${chosenWord}</span></p>`;
          blocker();
          },1000)
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  //call to vanvasCreator (for cleaning previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

//canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //for drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const righttArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, righttArm, leftLeg, rightLeg };
};

//draw the mN
const drawMan = (count) => {
  let { initialDrawing, head, body, leftArm, righttArm, leftLeg, rightLeg } =
    canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      righttArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;

    default:
      break;
  }
};
