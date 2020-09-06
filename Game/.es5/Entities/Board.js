"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CONSTANTS
var MIN_BOARD_SIZE = 8;
var MIN_TILE_SIZE = 16;

var Board = function (_cc$Node) {
	_inherits(Board, _cc$Node);

	function Board() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "DefaultBoard";
		var boardSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.size(MIN_BOARD_SIZE, MIN_BOARD_SIZE);
		var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : cc.size(MIN_TILE_SIZE, MIN_TILE_SIZE);

		_classCallCheck(this, Board);

		var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this));

		_this.setName(name);
		_this._array = new Array(boardSize.width * boardSize.height);
		_this._boardSize = boardSize.width;
		_this._tileSize = tileSize;
		return _this;
	}

	_createClass(Board, [{
		key: "place",
		value: function place(item, row, column) {
			var prevItem = this._array[row * this._boardSize.height + column];
			this._array[row * this._boardSize.height + column] = item;
			return prevItem;
		}
	}, {
		key: "width",
		get: function get() {
			return this._boardSize.width;
		}
	}, {
		key: "height",
		get: function get() {
			return this._boardSize.height;
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
}(cc.Node);