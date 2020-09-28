"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainGameScene = function (_cc$Scene) {
	_inherits(MainGameScene, _cc$Scene);

	function MainGameScene() {
		_classCallCheck(this, MainGameScene);

		return _possibleConstructorReturn(this, (MainGameScene.__proto__ || Object.getPrototypeOf(MainGameScene)).call(this));
	}

	_createClass(MainGameScene, [{
		key: "onEnter",
		value: function onEnter() {
			_get(MainGameScene.prototype.__proto__ || Object.getPrototypeOf(MainGameScene.prototype), "onEnter", this).call(this);
			this.scheduleUpdate();

			this.timerEntity = new TimerEntity();
			this.addChild(this.timerEntity);
			this.addChild(new Background("GameBackground", res.GameBackground_png));
			this.addChild(new MainGameLayer());

			this.landscape = new MainGameLandscapeLayout();
			this.addChild(this.landscape);

			this.portrait = new MainGamePortraitLayout();
			this.addChild(this.portrait);

			this.timerEntity.startCountdown();

			this.isAccessed = false;
		}
	}, {
		key: "update",
		value: function update(timestep) {
			if (this.timerEntity.remainingSeconds <= 0 && this.isAccessed === false) {
				GameManager.getInstance().gameState = GAME_STATE_RESULTS;
				this.addChild(new ResultsPopupLayout());
				GameManager.getInstance().pauseGame();
				this.isAccessed = true;
				this.landscape.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
				this.portrait.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
			}
		}
	}]);

	return MainGameScene;
}(cc.Scene);