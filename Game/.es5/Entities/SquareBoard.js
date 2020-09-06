"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SquareBoard = function (_Board) {
	_inherits(SquareBoard, _Board);

	function SquareBoard() {
		var squareSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MIN_BOARD_SIZE;
		var tileSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MIN_TILE_SIZE;

		_classCallCheck(this, SquareBoard);

		var _this = _possibleConstructorReturn(this, (SquareBoard.__proto__ || Object.getPrototypeOf(SquareBoard)).call(this, "SquareBoard", squareSize, tileSize));

		for (var row = 0; row < _this._boardSize.height; row++) {
			for (var col = 0; col < _this._boardSize.width; col++) {
				var tile = new Tile(cc.p(row * _this._tileSize.height, col * _this._tileSize.width), _this._tileSize, cc.color("#ff0000"));

				_this._array[row * _this._boardSize.width + col] = tile;
			}
		}
		return _this;
	}

	return SquareBoard;
}(Board);