"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//A component that is counts down from a value to zero.
// Time is in seconds.
var CountdownComponent = function (_cc$Component) {
	_inherits(CountdownComponent, _cc$Component);

	function CountdownComponent() {
		var startingTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 120.0;

		_classCallCheck(this, CountdownComponent);

		var _this = _possibleConstructorReturn(this, (CountdownComponent.__proto__ || Object.getPrototypeOf(CountdownComponent)).call(this));

		_this.setName("CountdownComponent");

		_this._startingTime = startingTime;
		_this._currentTime = startingTime;
		_this._isCountingDown = false;
		return _this;
	}

	_createClass(CountdownComponent, [{
		key: "onEnter",
		value: function onEnter() {
			_get(CountdownComponent.prototype.__proto__ || Object.getPrototypeOf(CountdownComponent.prototype), "onEnter", this).call(this);
		}
	}, {
		key: "update",
		value: function update(delta) {
			_get(CountdownComponent.prototype.__proto__ || Object.getPrototypeOf(CountdownComponent.prototype), "update", this).call(this, delta);
			if (!GameManager.getInstance().isPaused()) {
				if (this._isCountingDown === true && this._currentTime >= 0.0) {
					this._currentTime -= delta;
				} else {
					this._currentTime = 0.0;
				}
			}
		}
	}, {
		key: "start",
		value: function start() {
			this._isCountingDown = true;
			this._currentTime = this._startingTime;
		}
	}, {
		key: "resume",
		value: function resume() {
			this._isCountingDown = true;
		}
	}, {
		key: "pause",
		value: function pause() {
			this._isCountingDown = false;
		}
	}, {
		key: "stop",
		value: function stop() {
			this._isCountingDown = false;
			this._currentTime = 0.0;
		}
	}, {
		key: "reset",
		value: function reset() {
			this._currentTime = this._startingTime;
		}
	}, {
		key: "remainingSeconds",
		get: function get() {
			return this._currentTime;
		}
	}]);

	return CountdownComponent;
}(cc.Component);