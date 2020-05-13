let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;

function playerTakeTurn(e) {
	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();
	} else {
		showLightBox("This box is already selected", "Please try another");
		console.log("This box is already selected. Please try another");
		return;
	}
	if (gameStatus != "") {
		showLightBox(gameStatus, "Game is over");
		console.log("Game is over, " + gameStatus);
	}
}

function checkGameStatus() {
	numTurns++;
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
		console.log("Game status: " + gameStatus);
	}
	if (numTurns == 9) {
		gameStatus = "Tie Game";
		console.log("Game status: " + gameStatus);
	}
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
}

function checkWin() {
	let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	}
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	}
	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	}
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	}
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	}
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	}
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	}
}

function changeVisibility(divId) {
	var element = document.getElementById(divId);
	if (element) {
		element.className = (element.className == "hidden" ? "unhidden" : "hidden");
	}
}

function showLightBox(message, message2) {
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}

function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}