/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { colors } from "../data/colors.js";

/*-------------------------------- Variables --------------------------------*/
let colorOptions = [];
const usedColors = [];
let score,
  timeElapsed,
  timer,
  timerIntervalId,
  winTime, 
  min,
  sec, 
  seconds,
  correctAnswerChosen,
  unidentifiedColor,
  currentCategory,
  thisCategory,
  clickCount
// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart");

const currentColor = document.querySelector(".paintswatch");

const scoreDisplay = document.querySelector(".score")

const colorName = document.querySelector(".color-name");

const countDown = document.querySelector(".timer")

const startBtn = document.querySelector("#start-button")

// const allBtns = document.querySelectorAll(".buttons")

const btnA = document.querySelector("#btn-0");
const btnB = document.querySelector("#btn-1");
const btnC = document.querySelector("#btn-2");
const btnD = document.querySelector("#btn-3");

/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach((category) => category.addEventListener("click", handleClick));

startBtn.addEventListener("click", startTimer)

btnA.addEventListener("click", checkAnswer)
btnB.addEventListener("click", checkAnswer)
btnC.addEventListener("click", checkAnswer)
btnD.addEventListener("click", checkAnswer)
/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  clickCount = 0;
  score = 0;
  winTime = 0 
  min = 0
  sec = 0
  seconds = 0
  correctAnswerChosen = false;
  unidentifiedColor = "";
}

function render() {
  renderPaintswatch();
}

// function colorPicker(category, numColors)
function handleClick(evt) {
  clickCount++
  console.log("number of clicks: ", clickCount)
  const categoryChoice = evt.target.id;
  thisCategory = evt.target
  const colorArray = colors[categoryChoice];
  currentCategory = colorArray
  getNewPaintswatch()
}

function getNewPaintswatch(){
  if (usedColors.length === 141) {
    thisCategory.textContent = "X"
    colorName.textContent = "you guessed all the colors!";
    return;
  } else if (currentCategory.every(color => usedColors.includes(color))) {
    btnA.disabled = true
    btnB.disabled = true
    btnC.disabled = true
    btnD.disabled = true
    colorName.textContent = "choose another category from the palette"
    thisCategory.textContent = "X"
    return
  } else {
    unidentifiedColor = getRandomColor(currentCategory);
    colorOptions.unshift(unidentifiedColor);
    render()
    colorOptions = getColorOptions(currentCategory);
    renderButtons()
  }
}

function checkAnswer(evt){
  if (evt.target.textContent === unidentifiedColor){
    score++
    usedColors.push(unidentifiedColor);
    renderScore()
    getNewPaintswatch()
  } else {
    usedColors.push(unidentifiedColor);
    getNewPaintswatch()
  }
}


function startTimer(){
  if (timerIntervalId) {
    startBtn.disabled = true
  } else if (usedColors.length === 141){
    clearInterval(timerIntervalId)
  }
  timerIntervalId = setInterval(tick, 1000)
  }

function tick(){
  seconds++
  renderTime()
}

function renderTime(){
  min = Math.floor(seconds / 60)
  sec = seconds % 60
  if (sec < 10){
    countDown.textContent = `${min}:0${sec}`
  } else {
    countDown.textContent = `${min}:${sec}`
  }
}

function getColorOptions(colorArray) {
  const shuffledColorOptions = shuffle(colorArray);
  const filtered = shuffledColorOptions.filter((c) => c !== colorOptions[0]);
  const options = filtered.slice(0, 3);
  options.push(colorOptions[0]);
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
  btnA.disabled = false
  btnB.disabled = false
  btnC.disabled = false
  btnD.disabled = false
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

function renderScore() {
  scoreDisplay.textContent = `${score}/143`
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

