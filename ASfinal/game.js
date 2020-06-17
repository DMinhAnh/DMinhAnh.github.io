const levels = [

[ "flag", "rock", "", "", "",
"fence", "rock", "fenceside", "", "rider",
"", "tree", "animate", "animate", "animate",
"", "water", "", "", "",
"", "fenceside", "", "horseup", "" ],

[ "flag", "water", "", "", "fenceside",
"fence", "water", "", "", "rider",
"animate", "bridge animate", "animate", "animate", "animate",
"", "water", "fenceside", "", "",
"", "fenceside", "", "horseup", "" ],

[ "tree", "tree", "flag", "tree", "tree",
"animate", "animate", "animate", "animate", "animate",
"water", "bridge", "water", "water", "water",
"", "", "", "fenceside", "",
"rider", "rock", "", "", "horseup" ]

];

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];
const widthOfBoard = 5;

var currentLevel = 0;
var riderOn = false;
var currentLocationOfHorse = 0;
var currentAnimation;
var keyboardEnabled = false;

window.addEventListener("load", function() {
	document.getElementById("startgame").style.display = "block";
});

document.addEventListener("keydown", function(e) {
	if (keyboardEnabled == false) {
		return;
	}

	switch (e.keyCode) {
		case 37: 
			if (currentLocationOfHorse % widthOfBoard != 0) {
				tryToMove("left");
			}
			break;
		case 38:
			if (currentLocationOfHorse - widthOfBoard >= 0) {
				tryToMove("up");	
			}
			break;
		case 39:
			if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
				tryToMove("right");
			}
			break;
		case 40:
			if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
				tryToMove("down");	
			}
			break;
	}
});

function tryToMove(direction) {
	let oldLocation = currentLocationOfHorse;
	let oldClassName = gridBoxes[oldLocation].className;
	let nextLocation = 0;
	let nextClass = "";
	let nextLocation2 = 0;
	let nextClass2 = "";
	let newCLass = "";

	switch(direction) {
		case "left":
			nextLocation = currentLocationOfHorse - 1;
			break;
		case "right":
			nextLocation = currentLocationOfHorse + 1;
			break;
		case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;
			break;
	}

	nextClass = gridBoxes[nextLocation].className;
	if (noPassObstacles.includes(nextClass)) { return; }
	if (!riderOn && nextClass.includes("fence")) { return; }
	if (nextClass.includes("fence")) {
		if (riderOn) {
			if (direction == "left") {
				if (nextClass == "fence") { return; }
				if (currentLocationOfHorse % widthOfBoard < 2) { return; }
				nextClass = "jumpleft";
				nextClass2 = "horserideleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right") {
				if (nextClass == "fence") { return; }
				if (currentLocationOfHorse % widthOfBoard >= widthOfBoard - 2) { return; }
				nextClass = "jumpright";
				nextClass2 = "horserideright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up") {
				if (nextClass == "fenceside")  { return; }
				if (currentLocationOfHorse - widthOfBoard < widthOfBoard) { return; }
				nextClass = "jumpup";
				nextClass2 = "horserideup";
				nextLocation2 = nextLocation - widthOfBoard ;
			} else if (direction == "down") {
				if (nextClass == "fenceside")  { return; }
				if (currentLocationOfHorse + widthOfBoard >= (widthOfBoard * widthOfBoard) - widthOfBoard) { return; }
				nextClass = "jumpdown";
				nextClass2 = "horseridedown";
				nextLocation2 = nextLocation + widthOfBoard ;
			}
			if (noPassObstacles.includes(gridBoxes[nextLocation2].className)) {
				return;
			}

			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			gridBoxes[nextLocation].className = nextClass;
			setTimeout(function() {
				gridBoxes[nextLocation].className = oldClassName;
				currentLocationOfHorse = nextLocation2;
				nextClass = gridBoxes[currentLocationOfHorse].className;
				gridBoxes[currentLocationOfHorse].className = nextClass2;
				levelUp(nextClass);
			}, 350);
			return;
		}
	}
	if (nextClass == "rider") {
		riderOn = true;
	}
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	}

	newClass = (riderOn) ? "horseride" : "horse";
	newClass += direction;
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";		
	}

	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	if (nextClass.includes("enemy")) {
		document.getElementById("lose").style.display = "block";
		clearTimeout(currentAnimation);
		keyboardEnabled = false;
		return;
	}

	levelUp(nextClass);
}

function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn) {
		if (currentLevel < levels.length - 1) {
			document.getElementById("levelup").style.display = "block";
			clearTimeout(currentAnimation);
			keyboardEnabled = false;
			setTimeout(function() {
				document.getElementById("levelup").style.display = "none";
				currentLevel++;
				loadLevel();
			}, 1000);
		} else {
			document.getElementById("endgame").style.display = "block";
			clearTimeout(currentAnimation);
			keyboardEnabled = false;
		}
	}
}

function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;
	keyboardEnabled = true;

	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) {
			currentLocationOfHorse = i;
		}
	}

	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0);
}

function startGame() {
	document.getElementById("startgame").style.display = "none";
	loadLevel();
}

function restartGame() {
	document.getElementById("endgame").style.display = "none";
	document.getElementById("lose").style.display = "none";
	currentLevel = 0;
	clearTimeout(currentAnimation);
	loadLevel();
}

function animateEnemy(boxes, index) {
	if (boxes.length <= 0) {				
		return;
	}
	if (Math.round(Math.random()) == 0) {
		direction = "right";
	} else {
		direction = "left";
	}
	if (direction == "right") {
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		} else {
			index++;
		}
	} else {
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		}		
	}

	for (i = 0; i < boxes.length; i++) {
		boxes[i].classList.remove("enemyleft");
		boxes[i].classList.remove("enemyright");
	}
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else {
		boxes[index].classList.add("enemyleft");
	}

	for (j = 0; j < boxes[index].classList.length; j++) {
		if (boxes[index].classList[j].includes("horse")) {
			document.getElementById("lose").style.display = "block";
			clearTimeout(currentAnimation);
			keyboardEnabled = false;
			return;
		}
	}

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index);
	}, 750);
}