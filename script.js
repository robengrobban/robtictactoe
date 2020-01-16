 
let gameOn = false;
let playerMove = true;

function start() {
	$("#start-button").css("display", "none");
	$("#option-container").css("display", "none");
	$("#result").css("display", "none");
	let dom = $(".game-place");
	for ( let i = 0; i < dom.length; i++ ) {
		dom.eq(i)[0].innerHTML = "";
	}

	let computerStart = document.getElementById("computer-start").checked;
	if ( computerStart ) {
		$(".game-place").eq(4)[0].innerHTML = "O";
	}

	gameOn = true;
	setPlayerMove();
}

function end() {
	$("#start-button").css("display", "block");
	$("#option-container").css("display", "block");
	$("#result").css("display", "block");
	gameOn = false;
}

function choose( dom ) {

	if ( gameOn && playerMove ) {

		if ( dom.innerHTML != "" ) {
			return;
		}

		dom.innerHTML = "X";

		playerMove = false;

		let board = getBoard();

		if ( didWin("X", board) ) {

			$("#result").text("Spelare vann!");
			end();

		}
		else if ( isTie(board) ) {

			$("#result").text("Lika! Ingen vann.");
			end();

		}
		else {
			computerMove();
		}

	}

}

function minimax(board, isMaxi) {
	
	if ( didWin("X", board) ) {
		return -1;
	}
	else if ( didWin("O", board) ) {
		return 1;
	}
	else if ( isTie(board) ) {
		return 0;
	}

	if ( isMaxi ) {

		let bestScore = -Infinity;

		for ( let x = 0; x < 3; x++ ) {
			for ( let y = 0; y < 3; y++) {
				if ( board[x][y] == "" ) {

					board[x][y] = "O";
					let score = minimax(board, false);
					board[x][y] = "";

					if ( score > bestScore ) {
						bestScore = score;
					}

				}
			}
		}

		return bestScore;

	}
	else {

		let bestScore = Infinity;

		for ( let x = 0; x < 3; x++ ) {
			for ( let y = 0; y < 3; y++) {
				if ( board[x][y] == "" ) {

					board[x][y] = "X";
					let score = minimax(board, true);
					board[x][y] = "";

					if ( score < bestScore ) {
						bestScore = score;
					}

				}
			}
		}

		return bestScore;

	}

}

function computerMove() {

	let board = getBoard();

	if ( board[1][1] == "" ) {
		makeComputerMove(1, 1);
	}
	else {
		let bestScore = -Infinity;
		let bestMove = [];

		for ( let x = 0; x < 3; x++ ) {
			for ( let y = 0; y < 3; y++ ) {

				if ( board[x][y] == "" ) {

					board[x][y] = "O";
					let score = minimax(board, false);
					board[x][y] = "";

					if ( score >= bestScore ) {
						bestScore = score;
						bestMove[0] = x;
						bestMove[1] = y;
					}

				}

			}
		}

		makeComputerMove(bestMove[0], bestMove[1]);
	}

	board = getBoard();

	if ( didWin("O", board) ) {

		$("#result").text("Dator vann!");
		end();

	}
	else if ( isTie(board) ) {

		$("#result").text("Lika! Ingen vann.");
		end();

	}
	else {
		setPlayerMove();
	}
}

function setPlayerMove() {
	playerMove = true;
}

function makeComputerMove( placeX, placeY ) {
	let dom = $(".game-place");

	let board = [];
	board[0] = [];
	board[1] = [];
	board[2] = [];

	for ( let x = 0; x < 3; x++ ) { 
		for ( let y = 0; y < 3; y++ ) {
			board[x][y] = dom.eq(3*x + y)[0];
		}
	}

	board[placeX][placeY].innerHTML = "O";

}

//Får endast kollas om man har kollat båda didWin("X") och didWin("O");
function isTie( board ) {
	let full = true;

	for ( let x = 0; x < 3; x++ ) { 
		for ( let y = 0; y < 3; y++ ) {
			if ( board[x][y] == "" ) {
				full = false;
				break;
			}
		}
	}

	return full;
}
// Target = "X" eller "O", för spelarna
function didWin( target, board ) {

	//Diagonal
	if ( board[0][0] == target && board[1][1] == target && board[2][2] == target ) {
		return true;
	}
	else if ( board[2][0] == target && board[1][1] == target && board[0][2] == target ) {
		return true;
	}

	//Vertikala och diagonala
	for ( let i = 0; i < 3; i++ ) {
		if ( board[i][0] == target && board[i][1] == target && board[i][2] == target ) {
			return true;
		}
		else if ( board[0][i] == target && board[1][i] == target && board[2][i] == target ) {
			return true;
		}
	}

	return false;

}
function getBoard() {
	let dom = $(".game-place");

	let board = [];
	board[0] = [];
	board[1] = [];
	board[2] = [];

	for ( let x = 0; x < 3; x++ ) { 
		for ( let y = 0; y < 3; y++ ) {
			board[x][y] = dom.eq(3*x + y)[0].innerHTML;
		}
	}

	return board;
}