/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { colors } from "../data/colors.js";

/*-------------------------------- Variables --------------------------------*/
let colorOptions = [];
const usedColors = [];
let score,
  timeElapsed,
  correctAnswerChosen,
  unidentifiedColor,
  colorOptionsArray;
// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart");

const currentColor = document.querySelector(".paintswatch");

const colorName = document.querySelector(".color-name");

const btnA = document.querySelector("#btn-0");
const btnB = document.querySelector("#btn-1");
const btnC = document.querySelector("#btn-2");
const btnD = document.querySelector("#btn-3");

/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach((category) =>
  category.addEventListener("click", handleClick)
);

btnA.addEventListener("click", checkAnswer)
btnB.addEventListener("click", checkAnswer)
btnC.addEventListener("click", checkAnswer)
btnD.addEventListener("click", checkAnswer)
/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  score = 0;
  timeElapsed = 0;
  correctAnswerChosen = false;
  unidentifiedColor = "";
}

function render() {
  renderPaintswatch();
}

// function colorPicker(category, numColors)
function handleClick(evt) {
  const categoryChoice = evt.target.id;
  const colorArray = colors[categoryChoice];

  if (usedColors.length === colorArray.length) {
    console.log("no more colors");
    colorName.textContent = "no more colors in category";
    return;
  } else {
    unidentifiedColor = getRandomColor(colorArray);
    usedColors.push(unidentifiedColor);
    colorOptions.unshift(unidentifiedColor);
    console.log(unidentifiedColor);
    console.log("color array: ", colorArray);
    console.log("used colors: ", usedColors);
    render();
  }

  colorOptions = getColorOptions(colorArray);
  // if (colorOptions.length === 1) {
  //   colorOptionsArray.forEach(color => colorOptions.push(color))
  // } else if (colorOptions.length > 1 ) {
  //   colorOptions.length = 1
  //   colorOptionsArray.forEach(color => colorOptions.push(color))
  // }
  renderButtons();
}

function getColorOptions(colorArray) {
  const shuffledColorOptions = shuffle(colorArray);
  console.log("color options: ", colorOptions);
  console.log("color array: ", shuffledColorOptions);
  const filtered = shuffledColorOptions.filter((c) => c !== colorOptions[0]);
  console.log("filtered colorOptions: ", filtered);
  const options = filtered.slice(0, 3);
  console.log("incorrectOptions: ", options);
  options.push(colorOptions[0]);
  console.log("all options: ", options);
  return options;
}

function getRandomColor(colorArray) {
  let newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  while (newColor === unidentifiedColor || usedColors.includes(newColor)) {
    newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  return newColor;
}

function renderPaintswatch() {
  currentColor.style.backgroundColor = unidentifiedColor;
  colorName.textContent = unidentifiedColor;
}

function renderButtons() {
  const shuffledOptions = shuffle(colorOptions);
  shuffledOptions.forEach((c, idx) => {
    const btn = document.querySelector(`#btn-${idx}`);
    btn.textContent = c;
  });
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function checkAnswer(evt){
  if (evt.target.textContent === unidentifiedColor){
    score++
    console.log("correct");
  }
}

function renderScore() {
  
}
//  function increaseScore - += 1
// function colorOptionsPicker
// handleClick for category
// handleClick for buttons
// init = set color name to ?, set the color swatch to white, set the timer to 15s, score to 0

/*-------------------------------- Pseudocode -------------------------------*/

// // Create data file with category arrays: warms, cools, grays, white
// * Render function: categories display with score display, empty paint swatch with empty button choices
//     * Need a color wheel divided into 10 quadrants — add event listener to each quadrant

// * When clicked, paint swatch changes to random color from that cateory
//     * Say for reds:
//         * Randomly pull a color from warms to color paint swatch
//         * Randomly pull 3 color names + correct name for the options & 15 second timer
//         * Randomly assign colors to
//             * Timer length may change after testing. May add option be toggled off
//         * If correct name is chosen
//             * Score increases by 1
//             * Option to stay in category or return to color wheel
//             * Move correct guess into another array
// * have random guess checked against used color array -> if it's in there, choose a different color
//         * Else
//             * Player loses that question. Score does not increase
//             * That color name is removed from options for the next round

//             * Option to stay in category or return to color wheel

// * If the player plays all the way to the end, they get a percentage score pulled from their score
