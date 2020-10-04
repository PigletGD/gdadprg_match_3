"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/********************************
BoardManager manages the game boards.
It generates the board to be used.
It destroys the board used.
********************************/
var TILE_TYPE_0 = 0;
var TILE_TYPE_1 = 1;
var TILE_TYPE_2 = 2;
var TILE_TYPE_3 = 3;
var TILE_TYPE_4 = 4;
var TILE_TYPE_5 = 5;

var BoardManager = function () {
	function BoardManager() {
		_classCallCheck(this, BoardManager);
	}

	_createClass(BoardManager, [{
		key: "init",
		value: function init() {
			this.tileTypes = new Array();
			var tileSize = cc.size(16, 16);
			this.tileTypes.push(new TileButton(TILE_TYPE_0, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
			this.tileTypes.push(new TileButton(TILE_TYPE_1, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
			this.tileTypes.push(new TileButton(TILE_TYPE_2, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
			this.tileTypes.push(new TileButton(TILE_TYPE_3, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
			this.tileTypes.push(new TileButton(TILE_TYPE_4, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
			this.tileTypes.push(new TileButton(TILE_TYPE_5, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		}
	}, {
		key: "createBoard",
		value: function createBoard(size, contentSize) {
			this.currentBoard = new Board("Board", cc.size(size.width, size.height), cc.size(contentSize.width / size.width, contentSize.height / size.height));

			for (var row = 0; row < this.currentBoard.boardSize.height; row++) {
				for (var col = 0; col < this.currentBoard.boardSize.width; col++) {
					var randomIndex = void 0;

					var board = this.currentBoard;

					do {
						randomIndex = getRandomInt(0, this.tileTypes.length - 1);
					} while (row >= 2 && board._array[(row - 1) * board.boardSize.height + col].tileType == randomIndex && board._array[(row - 2) * board.boardSize.height + col].tileType == randomIndex || col >= 2 && board._array[row * board.boardSize.height + (col - 1)].tileType == randomIndex && board._array[row * board.boardSize.height + (col - 2)].tileType == randomIndex);

					var tile = this.tileTypes[randomIndex];
					this.currentBoard.addTile(tile, row, col);
				}
			}
			return this.currentBoard;
		}
	}, {
		key: "generateTile",
		value: function generateTile(row, col) {
			var randomIndex = getRandomInt(0, this.tileTypes.length - 1);
			var tile = this.tileTypes[randomIndex];
			this.currentBoard.addTile(tile, row, col);
		}
	}, {
		key: "board",
		get: function get() {
			return this._currentBoard;
		}
	}], [{
		key: "getInstance",
		value: function getInstance() {
			if (BoardManager._sharedInstance == undefined) {
				BoardManager._sharedInstance = new BoardManager();
				BoardManager._sharedInstance.init();
			}

			return BoardManager._sharedInstance;
		}
	}]);

	return BoardManager;
}();