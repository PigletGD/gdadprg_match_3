"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: BoardManager
// It creates a board.
// It handles creating additional tiles when a match is found.
// It stores all the tile types to be generated as tiles
// OPTIONAL: Create a certain board type.
// OPTIONAL: Shuffle when no match can be found.

/********************************
BoardManager manages the game boards.
It generates the board to be used.
It destroys the board used.
********************************/

var BoardManager = function () {
	function BoardManager() {
		_classCallCheck(this, BoardManager);
	}

	_createClass(BoardManager, null, [{
		key: "getInstance",
		value: function getInstance() {
			if (GameManager._sharedInstance == undefined) {
				GameManager._sharedInstance = new GameManager();
			}

			return GameManager._sharedInstance;
		}

		// 	this._tileTypes = new Array();

		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ffff00")));
		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff00ff")));
		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ffff")));
		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff0000")));
		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#0000ff")));
		// 	this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ff00")));

		// 	this.board = new Board("Board", cc.size(8, 8), cc.size(64, 64));

		// 	return instance;
		// }

		// addTileType(tile)
		// {
		// 	this._tileTypes.push(tile);
		// }

		// //TODO: BoardFactory
		// createBoard()
		// {
		// 	// this.board = new Board("Board", cc.size(8, 8), cc.size(64, 64));

		// 	for (let row = 0; row < this.board.boardSize.height; row++)
		// 	{
		// 		for (let col = 0; col < this.board.boardSize.width; col++)
		// 		{
		// 			let tile = this._tileTypes[getRandomInt(0, this._tileTypes.length - 1)];
		// 			this.board.addTile(tile, col, row);
		// 		}
		// 	}

		// 	return this.board;
		// }

	}]);

	return BoardManager;
}();