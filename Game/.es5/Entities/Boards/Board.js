"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CONSTANTS
var MIN_BOARD_SIZE = 8;
var MIN_TILE_SIZE = 16;

var Board = function (_cc$DrawNode) {
	_inherits(Board, _cc$DrawNode);

	function Board() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "DefaultBoard";
		var boardSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.size(MIN_BOARD_SIZE, MIN_BOARD_SIZE);
		var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : cc.size(MIN_TILE_SIZE, MIN_TILE_SIZE);

		_classCallCheck(this, Board);

		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this));

		_this.setName(name);
		_this.setAnchorPoint(0.0, 0.0);

		_this._array = new Array(boardSize.width * boardSize.height);
		_this._boardSize = boardSize;
		_this._tileSize = tileSize;
		_this._selectedTile = null;
		return _this;
	}

	_createClass(Board, [{
		key: "onEnter",
		value: function onEnter() {
			_get(Board.prototype.__proto__ || Object.getPrototypeOf(Board.prototype), "onEnter", this).call(this);

			var totalWidth = this._boardSize.width * this._tileSize.width;
			var totalHeight = this._boardSize.height * this._tileSize.height;

			this.drawRect(cc.p(0, 0), cc.p(totalWidth, totalHeight), cc.color("#000000"));

			if (cc.isDebugMode) {
				var debugDot = new cc.DrawNode();
				debugDot.drawDot(cc.p(0, 0), 5, cc.color("#ff0000"));
				this.addChild(debugDot);
			}
		}
	}, {
		key: "addTile",
		value: function addTile(tileRef, row, col) {
			var newTileButtonTest = new TileButton(tileRef.tileType, res.Button9Slice_png, res.Button9SliceSelected_png, this.tileSize, this, row, col);

			this._array[row * this._boardSize.height + col] = newTileButtonTest;
			this.addChild(newTileButtonTest);
		}
	}, {
		key: "setSelectedTile",
		value: function setSelectedTile(tilePos) {
			var currentTile = this._array[tilePos.row * this._boardSize.height + tilePos.col];

			if (this._selectedTile === null && currentTile.isSelected === false) {
				this.selectTile(currentTile);
			} else if (this._selectedTile !== null && currentTile.isSelected === false) {
				var magnitude = Math.abs(this._selectedTile.row - currentTile.row) + Math.abs(this._selectedTile.col - currentTile.col);

				if (magnitude === 1) {
					var indexA = this._selectedTile.row * this._boardSize.height + this._selectedTile.col;
					var indexB = currentTile.row * this._boardSize.height + currentTile.col;
					this.swapTiles(indexA, indexB);
					this.validateMatches();
					this.unselectTile();
				} else {
					this.unselectTile();
				}
			}
		}
	}, {
		key: "selectTile",
		value: function selectTile(tile) {
			this._selectedTile = tile;
			this._selectedTile.setColor(cc.color("#aaaaaa"));
			this._selectedTile.isSelected = true;
		}
	}, {
		key: "unselectTile",
		value: function unselectTile() {
			this._selectedTile.isSelected = false;
			this._selectedTile.setColor(cc.color("#ffffff"));
			this._selectedTile = null;
		}
	}, {
		key: "swapTiles",
		value: function swapTiles(indexA, indexB) {
			var tempPos = this._array[indexA].getPosition();
			var tempRowCol = { row: this._array[indexA].row, col: this._array[indexA].col };

			var bPos = this._array[indexB].getPosition();
			var bRowCol = { row: this._array[indexB].row, col: this._array[indexB].col };

			this._array[indexA].setPosition(bPos.x, bPos.y);
			this._array[indexA].row = bRowCol.row;
			this._array[indexA].col = bRowCol.col;

			this._array[indexB].setPosition(tempPos.x, tempPos.y);
			this._array[indexB].row = tempRowCol.row;
			this._array[indexB].col = tempRowCol.col;

			var _ref = [this._array[indexB], this._array[indexA]];
			this._array[indexA] = _ref[0];
			this._array[indexB] = _ref[1];
		}
	}, {
		key: "update",
		value: function update(timestep) {
			if (GameManager.getInstance().isPaused()) {
				for (var i = 0; i < this._array.length; i++) {
					if (this._array[i] !== null) {
						this._array[i].setTouchEnabled(false);
					}
				}
			} else {
				for (var _i = 0; _i < this._array.length; _i++) {
					if (this._array[_i] !== null) {
						this._array[_i].setTouchEnabled(true);
					}
				}
			}
		}
	}, {
		key: "validateMatches",
		value: function validateMatches() {
			// Checks the board for tiles that have a match
			var result = void 0,
			    tempResult = void 0;

			result = false;
			for (var i = 0; i < this._array.length; i++) {
				tempResult = this.checkTileForMatches(this._array[i]);
				if (tempResult) {
					result = tempResult;
					this._array[i].isMatchFound = true;
					console.log("Match found");
				}
			}

			this.removeMatches();
			this.shiftTilesDown();
			this.fillEmptyTiles();

			if (result) {
				var delay = cc.delayTime(0.5);
				this.runAction(new cc.sequence(delay, this.validateMatches));
			}
		}
	}, {
		key: "checkTileForMatches",
		value: function checkTileForMatches(tile) {
			var vertical = this.checkUpMatches(tile) + this.checkDownMatches(tile);
			var horizontal = this.checkLeftMatches(tile) + this.checkRightMatches(tile);

			var vertMatch = false;
			var horiMatch = false;

			// then do whatever when found a match
			if (vertical >= 2) vertMatch = true;
			if (horizontal >= 2) horiMatch = true;
			//console.log(vertMatch);
			//console.log(horiMatch);
			return vertMatch || horiMatch;
		}
	}, {
		key: "checkRightMatches",
		value: function checkRightMatches(tile) {
			var tilePosX = tile.col;
			var checkPosX = tile.col + 1;
			var foundDifferentTile = false;
			var similarTiles = 0;

			while (checkPosX < this.boardSize.width && !foundDifferentTile) {
				if (tile.tileType == this._array[tile.row * this.boardSize.height + checkPosX].tileType) {
					similarTiles++;
					checkPosX++;
				} else foundDifferentTile = true;
			}

			return similarTiles;
		}
	}, {
		key: "checkLeftMatches",
		value: function checkLeftMatches(tile) {
			var tilePosX = tile.col;
			var checkPosX = tile.col - 1;
			var foundDifferentTile = false;
			var similarTiles = 0;

			while (checkPosX >= 0 && !foundDifferentTile) {
				if (tile.tileType == this._array[tile.row * this.boardSize.height + checkPosX].tileType) {
					similarTiles++;
					checkPosX--;
				} else foundDifferentTile = true;
			}

			return similarTiles;
		}
	}, {
		key: "checkUpMatches",
		value: function checkUpMatches(tile) {
			var tilePosY = tile.row;
			var checkPosY = tile.row + 1;
			var foundDifferentTile = false;
			var similarTiles = 0;

			while (checkPosY < this.boardSize.height && !foundDifferentTile) {
				if (tile.tileType == this._array[checkPosY * this.boardSize.height + tile.col].tileType) {
					similarTiles++;
					checkPosY++;
				} else foundDifferentTile = true;
			}

			return similarTiles;
		}
	}, {
		key: "checkDownMatches",
		value: function checkDownMatches(tile) {
			var tilePosY = tile.row;
			var checkPosY = tile.row - 1;
			var foundDifferentTile = false;
			var similarTiles = 0;

			while (checkPosY >= 0 && !foundDifferentTile) {
				if (tile.tileType == this._array[checkPosY * this.boardSize.height + tile.col].tileType) {
					similarTiles++;
					checkPosY--;
				} else foundDifferentTile = true;
			}

			return similarTiles;
		}
	}, {
		key: "removeMatches",
		value: function removeMatches() {
			// Removes tiles in the list that have a match
			for (var i = 0; i < this._array.length; i++) {
				if (this._array[i].isMatchFound) {
					console.log("Delete tile");

					this._array[i].parent.removeChild(this._array[i]);
					this._array[i] = null;
					this.rewardScore(10);
				}
			}
		}
	}, {
		key: "rewardScore",
		value: function rewardScore(score) {
			GameManager.getInstance().addScore(score);
		}
	}, {
		key: "shiftTilesDown",
		value: function shiftTilesDown() {
			for (var col = 0; col < this.boardSize.width; col++) {
				this.swapUntilTop(col);
			}
		}
	}, {
		key: "swapUntilTop",
		value: function swapUntilTop(colNumber) {
			console.log(colNumber);

			var i = 0;
			var j = 1;

			while (j < this._boardSize.height) {
				var iIndex = i * this.boardSize.height + colNumber;
				var jIndex = j * this.boardSize.height + colNumber;

				var iTile = this._array[iIndex];
				var jTile = this._array[jIndex];

				if (iTile === null) {
					if (jTile === null) {
						j++;
					} else {
						// swapping

						var tempPos = jTile.getPosition();

						jTile.setPosition(tempPos.x, tempPos.y - jTile.size.height * (j - i));
						jTile.row = jTile.row - (j - i);
						jTile.col = jTile.col;

						var _ref2 = [this._array[jIndex], this._array[iIndex]];
						this._array[iIndex] = _ref2[0];
						this._array[jIndex] = _ref2[1];


						i++;
						j++;
					}
				} else {
					i++;
					j++;
				}
			}
		}
	}, {
		key: "fillEmptyTiles",
		value: function fillEmptyTiles() {
			for (var i = 0; i < this.boardSize.height; i++) {
				for (var j = 0; j < this.boardSize.width; j++) {
					if (this._array[i * this.boardSize.height + j] === null) {
						console.log("Row " + i + ", Col " + j);
						BoardManager.getInstance().generateTile(i, j);
					}
				}
			}
		}
	}, {
		key: "width",
		get: function get() {
			return this._boardSize.width * this._tileSize.width;
		}
	}, {
		key: "height",
		get: function get() {
			return this._boardSize.height * this._tileSize.height;
		}
	}, {
		key: "boardSize",
		get: function get() {
			return this._boardSize;
		}
	}, {
		key: "tileSize",
		get: function get() {
			return this._tileSize;
		}
	}]);

	return Board;
}(cc.DrawNode);