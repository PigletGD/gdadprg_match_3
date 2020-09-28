"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerEntity = function (_cc$Node) {
	_inherits(TimerEntity, _cc$Node);

	function TimerEntity() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "TimerEntity";
		var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;

		_classCallCheck(this, TimerEntity);

		var _this = _possibleConstructorReturn(this, (TimerEntity.__proto__ || Object.getPrototypeOf(TimerEntity)).call(this));

		_this.setName(name);
		_this.scheduleUpdate();
		_this._startingTime = startTime;
		return _this;
	}

	_createClass(TimerEntity, [{
		key: "onEnter",
		value: function onEnter() {
			_get(TimerEntity.prototype.__proto__ || Object.getPrototypeOf(TimerEntity.prototype), "onEnter", this).call(this);
			console.log("Timer initialized");
			this._countdownComponent = new CountdownComponent(this._startingTime);
			this.addComponent(this._countdownComponent);
		}
	}, {
		key: "update",
		value: function update(timestep) {
			_get(TimerEntity.prototype.__proto__ || Object.getPrototypeOf(TimerEntity.prototype), "update", this).call(this, timestep);

			//console.log(this.getName() + " " + this.remainingSeconds);
		}
	}, {
		key: "startCountdown",
		value: function startCountdown() {
			this._countdownComponent.start();
		}
	}, {
		key: "pauseCountdown",
		value: function pauseCountdown() {
			this._countdownComponent.pause();
		}
	}, {
		key: "resumeCountdown",
		value: function resumeCountdown() {
			this._countdownComponent.resume();
		}
	}, {
		key: "stopCountdown",
		value: function stopCountdown() {
			this._countdownComponent.stop();
		}
	}, {
		key: "resetCountdown",
		value: function resetCountdown() {
			this._countdownComponent.reset();
		}
	}, {
		key: "setStartingTime",
		value: function setStartingTime() {
			var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 120.0;

			this._startingTime = startTime;
			this._countdownComponent = new CountdownComponent(startTime);
		}
	}, {
		key: "remainingSeconds",
		get: function get() {
			return this._countdownComponent.remainingSeconds;
		}
	}, {
		key: "startTime",
		get: function get() {
			return this._startingTime;
		}
	}]);

	return TimerEntity;
}(cc.Node);