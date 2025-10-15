// Idecies of boxes that have been rolled
const rolledBoxes = [];

function roll1d6() {
    return Math.floor(Math.random() * 6) + 1;
}

// Roll stat and add to rolledBoxes
function rollStat(index) {
    let statRolls = [];
    for (let i = 0; i < 4; i++) {
        statRolls.push(roll1d6())
    }
    rolledBoxes.push(index)
    console.log("Dice rolled - " + statRolls);
    return statRolls;
}

// Take a rolled stat as a parameter, return string of highest 3 rolls and total
function parseRoll(rollList) {
    let returnArray = [];
    let returnString = "";
    let total = 0;
    let min = Math.min(...rollList);
    let index = rollList.indexOf(min);
    rollList.splice(index, 1);
    returnString = rollList.join(", ") + ", <s>" + min + "</s>";
    rollList.forEach(num => total += num);
    returnArray.push(returnString);
    returnArray.push(total);
    return returnArray;
}

function replaceButton(index) {
    // Set box number
    let boxID = "box" + index;
    // Parse roll at box index
    let parsedRoll = parseRoll(rollStat(index - 1));
    // Create and insert roll total
    let p1 = document.createElement("p");
    p1.id = "roll" + index;
    p1.classList.add("rollTotal");
    p1.textContent = parsedRoll[1];
    document.getElementById(boxID).parentNode.insertBefore(p1, document.getElementById(boxID));
    // Create and insert roll details, replacing button
    let p2 = document.createElement("p");
    let button = document.getElementById(boxID);
    p2.id = boxID;
    p2.classList.add("roll");
    p2.innerHTML = parsedRoll[0];
    button.parentNode.replaceChild(p2, button);
    console.log("Box " + index + " rolled.");
    console.log("Box indecies rolled: " + rolledBoxes);
    if (rolledBoxes.length === 36) {
        removeRollAllButton();
    }
}

function rollAll() {
    for (let i = 0; i <= 35; i++) {
        if (!rolledBoxes.includes(i)) {
            replaceButton(i + 1)
        }
    }
}

function removeRollAllButton() {
    let rollAllButton = document.getElementById("rollAll");
    rollAllButton.parentNode.removeChild(rollAllButton);
}

/* function addHighlightButtons() { 
    for (let i = 0; i < 14; i ++) {
        let highlightButton = document.createElement("button");
        highlightButton.id = "highlight" + (i + 1);
        highlightButton.textContent = "Select";
        placeHightlightButton(highlightButton);
    }
}

function placeHightlightButton(button) {
    switch (button.id) {
        case "highlight1":
            document.getElementById("box1").parentNode.appendChild(button);
            break;
    }
}

function hightlightButton(boxes) {
    boxes.forEach(box => {
        let boxID = "box" + box;
        let boxDiv = document.getElementById(boxID).parentNode;
        boxDiv.style.backgroundColor = "yellow";
    })
}

function resetHighlights(boxes) {
    boxes.forEach(box => {
        let boxID = "box" + box;
        let boxDiv = document.getElementById(boxID).parentNode;
        boxDiv.style.backgroundColor = "lightgray";
    })
} */

document.addEventListener("DOMContentLoaded", function() {
    console.log("JS ready");
    let gridChildren = document.getElementById('grid').children;
    for (let i = 0; i < gridChildren.length; i++) {
        let newButton = document.createElement("button");
        newButton.id = "box" + (i + 1);
        newButton.textContent = "Roll";
        gridChildren[i].appendChild(newButton);
    }
    for (let i = 1; i <= 36; i++) {
        let boxID = "box" + i;
        document.getElementById(boxID).addEventListener("click", function() { replaceButton(i); });
    }
    document.getElementById("rollAll").addEventListener("click", function() { rollAll(); })
});
