// Functions to be executed on page load
emptyBoxes();
letterBoxes();

// Event listeners for letter boxes:
let draggables = document.querySelectorAll(".letter");
draggables.forEach(item => {item.addEventListener("drag", drag)});
draggables.forEach(item => {item.addEventListener("dragend", dragEnd)});
draggables.forEach(item => {item.addEventListener("dragstart", dragStart)});

// Event listeners for empty boxes:
let dragTarget = document.querySelectorAll(".box");
dragTarget.forEach(item => {item.addEventListener("dragenter", dragEnter)});
dragTarget.forEach(item => {item.addEventListener("dragleave", dragLeave)});
dragTarget.forEach(item => {item.addEventListener("dragover", allowDrop)});
dragTarget.forEach(item => {item.addEventListener("drop", drop)});

let dropBackZone = document.querySelector(".letters");
dropBackZone.addEventListener("drop", drop);
dropBackZone.addEventListener("dragover", allowDrop);


// functions for event listeners
function drag(event) {
	event.target.style.opacity = "0.5";
}

function dragEnd(event) {
	event.target.style.opacity = "1";

}

function dragStart(event) {
	event.target.style.transform = "scale(1)";
	event.dataTransfer.setData("text/html", event.target.id);
}

function dragEnter(event) {
	event.target.style.border = "5px dashed #FFA1CA";
}

function dragLeave(event) {
	event.preventDefault();
	event.target.style.border= "2px solid black";
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	event.preventDefault();
	let data = event.dataTransfer.getData("text/html");
	let a = document.getElementById(data);
  	// event.target.replaceWith(a);
  	event.target.appendChild(a);
  	event.target.style.border = "none";
  	boardFull(); 
}

// Function to create empty boxes according to 
// the number of letters in the animal name
function emptyBoxes() {
	
	let name = document.querySelector("img").getAttribute("id");
	let boxNum = name.length;
	
	for (let i = 0; i < boxNum; i++) {
		let box = document.createElement("div");
		box.setAttribute("id", "idd"+i);
		box.classList.add("box");
		let empty = document.querySelector(".empty");
		empty.appendChild(box);
	}
}

// function to create the letter Boxes - 10 boxes
 // which include the required letters of the animal name

function letterBoxes() {
let letter;

	let letterList = [];
	let word = document.querySelector("img").getAttribute("id");

	for (let j = 0; j < word.length; j++) {
		letterList.push(word[j]);
	}	

	let alphabet = "abcdefghijklmnopqrstuvwxyz";
	
	for (let a = 1; a < 10-word.length+1; a++){
		letterList.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
	}
	
	let sortedList = letterList.sort();

	for (let k = 0; k < 10; k++) {
		letter = document.createElement("div");
		letter.classList.add("letter");
		letter.setAttribute("id", "id"+k);
		letter.setAttribute("draggable", "true");
		let letters = document.querySelector(".letters");
		letters.appendChild(letter);
		letter.innerHTML = sortedList[k];
	}
}

//  function that checks if all the slots have been filled
function boardFull() {
	let boardIsFull = true;
	let boxEmpty = document.querySelectorAll(".box");
	for (let g = 0; g < boxEmpty.length; g++) {
		if (boxEmpty[g].firstElementChild === null) {
			boardIsFull = false;
			break;
		}
	}

	if (boardIsFull) {
		correct();
	}
}

// function to be triggered when all the boxes have been filled
function correct() {

	// make a list of all the divs that were dragged to empty slots (letters become children of the divs)
	let allEmpty = document.querySelectorAll(".box");
	let lettersOnBoard = [];
	allEmpty.forEach(node => lettersOnBoard.push(node.firstElementChild.textContent));
	const letterWord = lettersOnBoard.join('');

	// make a list of all the letters of the word in the correct order
	let correctWord = document.querySelector("img").getAttribute("id");
	
	// if both lists are equal in length - compare content in div and corresponding letter on list
	if (letterWord === correctWord) {
		allEmpty.forEach(node => node.style.border = "5px solid #FFA1CA");
		let cont = document.querySelector(".continue");
		cont.classList.remove("continue");

	}
}

