"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TileButton = function (_ccui$Button) {
	_inherits(TileButton, _ccui$Button);

	function TileButton(tileType, normalSpriteFilePath, selectedSpriteFilePath, size, board, row, column) {
		_classCallCheck(this, TileButton);

		var _this = _possibleConstructorReturn(this, (TileButton.__proto__ || Object.getPrototypeOf(TileButton)).call(this, normalSpriteFilePath, selectedSpriteFilePath));

		_this.scheduleUpdate();

		_this.size = size;
		_this.isSelected = false;
		_this.row = row;
		_this.col = column;

		_this.setAnchorPoint(0.0, 0.0);
		_this.setScale9Enabled(true);
		_this.setCapInsets(cc.rect(20, 20, 20, 20));
		_this.setPosition(_this.col * _this.size.width, _this.row * _this.size.height);
		_this.setContentSize(size);

		_this.board = board;

		_this.tileType = tileType;

		_this.isMatchFound = false;

		_this.initSpriteFromType();

		_this.addClickEventListener(_this.onClick.bind(_this));
		return _this;
	}

	_createClass(TileButton, [{
		key: "initSpriteFromType",
		value: function initSpriteFromType() {
			switch (this.tileType) {
				case TILE_TYPE_0:
					{
						this.sprite = new cc.Sprite(res.BidetIcon_png);
					}break;
				case TILE_TYPE_1:
					{
						this.sprite = new cc.Sprite(res.PlungerIcon_png);
					}break;
				case TILE_TYPE_2:
					{
						this.sprite = new cc.Sprite(res.PoopIcon_png);
					}break;
				case TILE_TYPE_3:
					{
						this.sprite = new cc.Sprite(res.ScrubberIcon_png);
					}break;
				case TILE_TYPE_4:
					{
						this.sprite = new cc.Sprite(res.ToiletPaperIcon_png);
					}break;
				case TILE_TYPE_5:
					{
						this.sprite = new cc.Sprite(res.WaterIcon_png);
					}break;
			}

			this.sprite.setAnchorPoint(0.0, 0.0);
			var originalSize = this.sprite.getContentSize();
			this.sprite.setScale(this.size.width / originalSize.height, this.size.height / originalSize.height);
		}
	}, {
		key: "onEnter",
		value: function onEnter() {
			_get(TileButton.prototype.__proto__ || Object.getPrototypeOf(TileButton.prototype), "onEnter", this).call(this);

			this.addChild(this.sprite);
		}
	}, {
		key: "update",
		value: function update(timestep) {}
	}, {
		key: "onClick",
		value: function onClick() {
			this.board.setSelectedTile({ col: this.col, row: this.row });
		}
	}]);

	return TileButton;
}(ccui.Button);