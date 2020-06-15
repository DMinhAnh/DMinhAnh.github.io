const levels = [

[ "flag", "rock", "", "", "",
"fence", "rock", "", "", "rider",
"", "tree", "animate", "animate", "animate",
"", "water", "", "", "",
"", "fenceside", "", "horseup", "" ],

[ "flag", "water", "", "", "",
"fence", "water", "", "", "rider",
"animate", "bridge animate", "animate", "animate", "animate",
"", "water", "", "", "",
"", "fenceside", "", "horseup", "" ],

[ "tree", "tree", "flag", "tree", "tree",
"animate", "animate", "animate", "animate", "animate",
"water", "bridge", "water", "water", "water",
"", "", "", "fenceside", "",
"rider", "rock", "", "", "horseup" ]

];

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];

var currentLevel = 0;
var riderOn = false;
var currentLocationOfHorse = 0;
var currentAnimation;
var widthOfBoard = 5;

window.addEventListener("load", function() {
	loadLevel();
});

document.addEventListener("keydown", function(e) {
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
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			if (direction == "left") {
				nextClass = "jumpleft";
				nextClass2 = "horserideleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right") {
				nextClass = "jumpright";
				nextClass2 = "horserideright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up") {
				nextClass = "jumpup";
				nextClass2 = "horserideup";
				nextLocation2 = nextLocation - widthOfBoard ;
			} else if (direction == "down") {
				nextClass = "jumpdown";
				nextClass2 = "horseridedown";
				nextLocation2 = nextLocation + widthOfBoard ;
			}
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
		return;
	}

	levelUp(nextClass);
}

function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn) {
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function() {
			document.getElementById("levelup").style.display = "none";
			if (currentLevel < levels.length - 1) {
				currentLevel++;
			} else {
				currentLevel = 0;
			}
			loadLevel();
		}, 1000);
	}
}

function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) {
			currentLocationOfHorse = i;
		}
	}

	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0, "right");
}

function animateEnemy(boxes, index, direction) {
	if (boxes.length <= 0) {				
		return;
	}
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else {
		boxes[index].classList.add("enemyleft");
	}
	for (i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
		}
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

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
}