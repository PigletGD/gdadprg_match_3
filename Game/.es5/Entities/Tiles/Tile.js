"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentID = 0;

var Tile = function (_cc$DrawNode) {
	_inherits(Tile, _cc$DrawNode);

	function Tile(spriteFilepath, position, size, color) {
		_classCallCheck(this, Tile);

		var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this));

		_this.setAnchorPoint(1.0, 1.0);
		_this.setPosition(position);
		_this.size = size;
		_this.bgColor = color;
		_this.id = currentID;
		_this.isSelected = false;
		currentID++;
		// console.log(this);

		// GameManager.getInstance().test();

		_this.sprite = new cc.Sprite(spriteFilepath);
		_this.sprite.setAnchorPoint(0.0, 0.0);
		var originalSize = _this.sprite.getContentSize();
		_this.sprite.setScale(size.width / originalSize.height, size.height / originalSize.height);
		return _this;
	}

	_createClass(Tile, [{
		key: "onEnter",
		value: function onEnter() {
			_get(Tile.prototype.__proto__ || Object.getPrototypeOf(Tile.prototype), "onEnter", this).call(this);

			this.drawRect(cc.p(0, 0), cc.p(this.size.width, this.size.height), this.bgColor);

			this.addChild(this.sprite);

			var idText = new cc.LabelTTF(this.id.toString(), "Arial", 32);
			idText.setAnchorPoint(0, 0);
			this.addChild(idText);

			if (cc.isDebugMode) {
				var debugDot = new cc.DrawNode();
				debugDot.drawDot(cc.p(0, 0), 5, cc.color("#ff00ff"));
				this.addChild(debugDot);
			}
		}
	}]);

	return Tile;
}(cc.DrawNode);