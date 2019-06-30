"use strict";

var chess = {
	size: 8,
	chessBoard: document.querySelector("#board"),
	build: function () {
		this.chessBoard.style.height = (this.size + 1) * 40 + "px";
		this.chessBoard.style.width = (this.size + 1) * 40 + "px";

		for (var row = 1; row <= this.size + 1; row++) { // строка
			for (var col = 1; col <= this.size + 1; col++) { // столбец
				var cell = document.createElement("div");
				cell.className = "cell";

				if (col == 1 && row > 1) {
					cell.innerHTML = row - 1;
				}
				var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
				if (row == 1 && col > 1) {
					cell.innerHTML = letters[col - 2];
				}

				if (col > 1 && row > 1) {
					if (row % 2 !== 0) {
						if (col % 2 === 0) {
							cell.style.backgroundColor = "#fff";
							cell.className += " cellChess";
						} else {
							cell.style.backgroundColor = "#aaa";
							cell.className += " cellChess";
						}
					} else if (col % 2 !== 0) {
						cell.style.backgroundColor = "#fff";
						cell.className += " cellChess";
					} else {
						cell.style.backgroundColor = "#aaa";
						cell.className += " cellChess";
					}
				}

				this.chessBoard.appendChild(cell);
			}
		}
	},
	figures: function () {
		var allCells = document.querySelectorAll(".cellChess");
		console.log(allCells);

		// Черные фигуры
		allCells[0].innerHTML = "t";
		allCells[7].innerHTML = "t";
		allCells[1].innerHTML = "m";
		allCells[6].innerHTML = "m";
		allCells[2].innerHTML = "v";
		allCells[5].innerHTML = "v";
		allCells[3].innerHTML = "w";
		allCells[4].innerHTML = "l";
		for (var i = 8, j = 48; i <= 15, j <= 55; i++ , j++) {
			allCells[i].innerHTML = "o";
			allCells[j].innerHTML = "p";
		}
		// Белые фигуры
		allCells[56].innerHTML = "r";
		allCells[63].innerHTML = "r";
		allCells[57].innerHTML = "n";
		allCells[62].innerHTML = "n";
		allCells[58].innerHTML = "b";
		allCells[61].innerHTML = "b";
		allCells[59].innerHTML = "q";
		allCells[60].innerHTML = "k";
	}
}

chess.build();
chess.figures();