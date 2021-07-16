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
dragTarget.forEach(item => {item.addEventListener("draleave", dragLeave)});
dragTarget.forEach(item => {item.addEventListener("dragover", dragOver)});
dragTarget.forEach(item => {item.addEventListener("drop", drop)});

// The functions:

// Function to create empty boxes according to 
// the number of letters in the animal name
function emptyBoxes() {
	
	let name = document.querySelector("img").getAttribute("id");
	let boxNum = name.length;
	
	for (let i = 1; i < boxNum+1; i++) {
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
	
	for (let a = 1; a < 7; a++){
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

// functions for event listeners
function drag(event) {
}

function dragEnd(event) {
}

function dragStart(event) {
	event.dataTransfer.setData("text/html", event.target.id);
	event.dataTransfer.effectAllowed = "move";
}

function dragEnter(event) {
	event.preventDefault();
}

function dragLeave(event) {
}

function dragOver(event) {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
}

function drop(event) {
	event.preventDefault();
	let data = event.dataTransfer.getData("text/html");
	let a = document.getElementById(data);
  	event.target.replaceWith(a);
  	//event.target.appendChild(a);
}
