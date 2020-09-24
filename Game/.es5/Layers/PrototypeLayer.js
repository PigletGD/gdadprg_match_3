"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrototypeLayer = function (_cc$LayerColor) {
	_inherits(PrototypeLayer, _cc$LayerColor);

	function PrototypeLayer() {
		var gameSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cc.winSize;
		var bgColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cc.color("#ff00ff");

		_classCallCheck(this, PrototypeLayer);

		var _this = _possibleConstructorReturn(this, (PrototypeLayer.__proto__ || Object.getPrototypeOf(PrototypeLayer)).call(this, bgColor, gameSize.width, gameSize.height));

		_this.setName("PrototypeLayer");
		cc.winSize;

		return _this;
	}

	_createClass(PrototypeLayer, [{
		key: "onEnter",
		value: function onEnter() {
			_get(PrototypeLayer.prototype.__proto__ || Object.getPrototypeOf(PrototypeLayer.prototype), "onEnter", this).call(this);
			this.scheduleUpdate();

			GameManager.getInstance().test();

			// let board = boardManager.createBoard();
			// board.x = this.getContentSize().width / 2 - board.width / 2;
			// board.y = this.getContentSize().height / 2 - board.height / 2;

			// this.addChild(board);
		}
	}]);

	return PrototypeLayer;
}(cc.LayerColor);