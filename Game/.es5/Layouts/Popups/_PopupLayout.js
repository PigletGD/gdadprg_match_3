"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_ccui$RelativeBox) {
	_inherits(Popup, _ccui$RelativeBox);

	function Popup(name) {
		_classCallCheck(this, Popup);

		var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this));

		_this.setName(name);

		_this.setAnchorPoint(cc.p(0.5, 0.5));
		_this.setPositionType(ccui.Widget.POSITION_PERCENT);
		_this.setPositionPercent(cc.p(0.5, 0.5));
		_this.setSizeType(ccui.Widget.SIZE_PERCENT);
		_this.setSizePercent(cc.p(0.7, 0.7));

		_this.setBackGroundImageScale9Enabled(true);
		_this.setBackGroundImage(res.Button9Slice_png, ccui.Widget.LOCAL_TEXTURE);
		var insetSize = 20;
		_this.setBackGroundImageCapInsets(cc.rect(insetSize, insetSize, insetSize, insetSize));
		return _this;
	}

	_createClass(Popup, [{
		key: "addUIElement",
		value: function addUIElement(uiElement) {
			this.addChild(pauseText);
		}
	}]);

	return Popup;
}(ccui.RelativeBox);