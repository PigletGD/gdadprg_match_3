"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentID = 0;
var TILE_TYPE_1 = 1;
var TILE_TYPE_2 = 1;
var TILE_TYPE_3 = 1;
var TILE_TYPE_4 = 1;
var TILE_TYPE_5 = 1;
var TILE_TYPE_6 = 1;
var TILE_TYPE_7 = 1;

var TileButton = function (_ccui$Button) {
	_inherits(TileButton, _ccui$Button);

	function TileButton(iconSpriteFilePath, normalSpriteFilePath, selectedSpriteFilePath, position, size, color, board) {
		_classCallCheck(this, TileButton);

		var _this = _possibleConstructorReturn(this, (TileButton.__proto__ || Object.getPrototypeOf(TileButton)).call(this, normalSpriteFilePath, selectedSpriteFilePath));

		_this.setAnchorPoint(0.0, 0.0);
		_this.setScale9Enabled(true);
		_this.setCapInsets(cc.rect(20, 20, 20, 20));
		_this.setPosition(position);
		_this.setContentSize(size);
		_this.size = size;
		_this.bgColor = color;
		_this.id = currentID;
		_this.isSelected = false;
		_this._board = board;
		currentID++;
		// console.log(this);

		// GameManager.getInstance().test();

		_this.sprite = new cc.Sprite(iconSpriteFilePath);
		_this.sprite.setAnchorPoint(0.0, 0.0);
		var originalSize = _this.sprite.getContentSize();
		_this.sprite.setScale(size.width / originalSize.height, size.height / originalSize.height);

		// Binds function to the button for click event
		_this.addClickEventListener(_this.onClick.bind(_this));
		return _this;
	}

	_createClass(TileButton, [{
		key: "onEnter",
		value: function onEnter() {
			_get(TileButton.prototype.__proto__ || Object.getPrototypeOf(TileButton.prototype), "onEnter", this).call(this);

			var rect = new cc.DrawNode();
			rect.drawRect(cc.p(0, 0), cc.p(this.size.width, this.size.height), this.bgColor);

			// this.addChild(rect);
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
	}, {
		key: "onClick",
		value: function onClick() {
			console.log("test");
			this._board.setSelectedTile(this.getPosition());
		}
	}]);

	return TileButton;
}(ccui.Button);