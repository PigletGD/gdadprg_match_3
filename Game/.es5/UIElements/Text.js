"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_ccui$Text) {
	_inherits(Text, _ccui$Text);

	function Text(name, message, fontAsset, size, positionByPercent) {
		var outlineProp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : { color: cc.color(0, 0, 0, 255), stroke: 0 };

		_classCallCheck(this, Text);

		var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, message, fontAsset, size));

		_this.setName(name);
		_this.setPositionType(ccui.Widget.POSITION_PERCENT);
		_this.setPositionPercent(cc.p(positionByPercent.x, positionByPercent.y));
		_this.enableOutline(outlineProp.color, outlineProp.stroke);

		_this.addComponent(new FitToParent());
		return _this;
	}

	return Text;
}(ccui.Text);

var Text2 = function (_ccui$Text2) {
	_inherits(Text2, _ccui$Text2);

	function Text2(name) {
		_classCallCheck(this, Text2);

		var _this2 = _possibleConstructorReturn(this, (Text2.__proto__ || Object.getPrototypeOf(Text2)).call(this));

		_this2.setName(name);
		_this2.setPositionType(ccui.Widget.POSITION_PERCENT);
		_this2.addComponent(new FitToParent());
		return _this2;
	}

	return Text2;
}(ccui.Text);