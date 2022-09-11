
/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { reds, oranges, yellows, greens, blues, purples, browns, grays, whites } from "../data/colors.js"



/*-------------------------------- Variables --------------------------------*/
const colorOptions = []
const usedColors = []
let score, timeElapsed, correctAnswerChosen
// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart")

const currentColor = document.querySelector(".current-color")




/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach(category => category.addEventListener("click", categoryClick))

function categoryClick(evt) {
  console.log(evt, ' clicked');
}

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  score = 0
  timeElapsed = 0
  correctAnswerChosen = false
}


colorOptions.push("red")
console.log(typeof colorOptions, colorOptions);
//  function increaseScore - += 1
// function colorPicker(category, numColors)
// function currentColorPicker 
// function colorOptionsPicker
// handleClick for category
// handleClick for buttons
// renderFunction = set color name to ?, set the color swatch to white, set the timer to 15s, score to 0


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

