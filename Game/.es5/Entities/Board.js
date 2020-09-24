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
		key: "place",
		value: function place(item, row, column) {
			var prevItem = this._array[row * this._boardSize.height + column];
			this._array[row * this._boardSize.height + column] = item;
			return prevItem;
		}
	}, {
		key: "addTile",
		value: function addTile(tile, x, y) {
			var tilePosition = cc.p(x * this._tileSize.width, y * this._tileSize.height);

			var newTile = new Tile(tile.sprite, tilePosition, this._tileSize, tile.bgColor);

			this._array[y * this._boardSize.height + x] = newTile;
			this.addChild(newTile);
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