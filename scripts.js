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
    rolledBoxes.push(index + 1)
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
        addTotals();
    }
}

function rollAll() {
    for (let i = 1; i <= 64; i++) {
        if (!rolledBoxes.includes(i) && checkRollBox(i)) {
            replaceButton(i);
        }
    }
}

function checkRollBox(i) {
    let boxID = "box" + i;
    let gridChildren = document.getElementById('grid').children;
    if (gridChildren[i - 1].classList.contains("rollBox")) {
        return true;
    }
}

function removeRollAllButton() {
    let rollAllButton = document.getElementById("rollAll");
    rollAllButton.parentNode.removeChild(rollAllButton);
}

// Adds total stats from each row to total boxes
function addTotals() {
    let gridChildren = document.getElementById('grid').children;
    for (let i = 0; i < gridChildren.length; i++) {
        if (gridChildren[i].classList.contains("totalBox")) {
            gridChildren[i].classList.remove("totalBoxMute");
            let newP = document.createElement("p");
            newP.classList.add("statsTotal");
            let rowBoxes = getRowBoxes(i + 1) || [];
            let total = 0;
            for (let j = 0; j < rowBoxes.length; j++) {
                let el = document.getElementById("roll" + rowBoxes[j]);
                if (el && el.textContent) {
                    total += parseInt(el.textContent, 10) || 0;
                }
            }
            newP.textContent = "Total: " + total;
            gridChildren[i].appendChild(newP);
        }
    }
function getRowBoxes(totalBoxIndex) {
    let rowBoxes = [];
    switch (totalBoxIndex) {
        case 16:
            rowBoxes = [10,11,12,13,14,15];
            break;
        case 24:
            rowBoxes = [18,19,20,21,22,23];
            break;
        case 32:
            rowBoxes = [26,27,28,29,30,31];
            break;
        case 40:
            rowBoxes = [34,35,36,37,38,39];
            break;
        case 48:
            rowBoxes = [42,43,44,45,46,47];
            break;
        case 56:
            rowBoxes = [50,51,52,53,54,55];
            break;
        case 57:
            rowBoxes = [15,22,29,36,43,50];
            break;
        case 58:
            rowBoxes = [10,18,26,34,42,50];
            break;
        case 59:
            rowBoxes = [11,19,27,35,43,51];
            break;
        case 60:
            rowBoxes = [12,20,28,36,44,52];
            break;
        case 61:
            rowBoxes = [13,21,29,37,45,53];
            break;
        case 62:
            rowBoxes = [14,22,30,38,46,54];
            break;
        case 63:
            rowBoxes = [15,23,31,39,47,55];
            break;
        case 64:
            rowBoxes = [10,19,28,37,46,55];
            break;
        default:
            rowBoxes = [];
    }
    return rowBoxes;
    }
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

/* v1
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
}); */

// v2 
document.addEventListener("DOMContentLoaded", function() {
    console.log("JS ready");
    for (let i = 1; i <= 64; i++ ) {
        let boxID = "box" + i;
        let newDiv = document.createElement("div");
        if (i <= 9 || i === 17 || i === 25 || i === 33 || i === 41 || i === 49) {
            newDiv.classList.add("emptyBox");
        } else if ((i >= 10 && i <= 15) || (i >= 18 && i <= 23) || (i >= 26 && i <= 31) || (i >= 34 && i <= 39) || (i >= 42 && i <= 47) || (i >= 50 && i <= 55)) {
            newDiv.classList.add("rollBox");
            let newButton = document.createElement("button");
            newButton.id = boxID;
            newButton.textContent = "Roll";
            newButton.addEventListener("click", function() { replaceButton(i); });
            newDiv.appendChild(newButton);
        } else if (i === 8 || i === 16 || i === 24 || i === 32 || i === 40 || i === 48 || i >= 56) {
            newDiv.classList.add("totalBox");
            newDiv.classList.add("totalBoxMute");
        }
        document.getElementById("grid").appendChild(newDiv);
    }
    document.getElementById("rollAll").addEventListener("click", function() { rollAll(); })
});