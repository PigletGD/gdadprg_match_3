"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAME_STATE_INACTIVE = 1;
var GAME_STATE_PLAY_LEVEL = 2;
var GAME_STATE_RESULTS = 3;

/********************************
GameManager manages the state of the game
********************************/

var GameManager = function () {
	function GameManager() {
		_classCallCheck(this, GameManager);
	}

	_createClass(GameManager, [{
		key: "nameHasSet",
		value: function nameHasSet() {
			this._hasSetName = true;
		}
	}, {
		key: "addScore",
		value: function addScore(val) {
			this._score += val;
		}
	}, {
		key: "pauseGame",
		value: function pauseGame() {
			this._isPaused = true;
		}
	}, {
		key: "resumeGame",
		value: function resumeGame() {
			this._isPaused = false;
		}
	}, {
		key: "isPaused",
		value: function isPaused() {
			return this._isPaused;
		}
	}, {
		key: "isNameSet",
		get: function get() {
			return this._hasSetName;
		}
	}, {
		key: "gameState",
		get: function get() {
			return this._gameState;
		},
		set: function set(gameState) {
			this._gameState = gameState;
		}
	}, {
		key: "score",
		get: function get() {
			return this._score;
		},
		set: function set(val) {
			this._score = val;
		}
	}, {
		key: "highscore",
		get: function get() {
			return this._highscore;
		},
		set: function set(val) {
			this._highscore = val;
		}
	}], [{
		key: "getInstance",
		value: function getInstance() {
			if (GameManager._sharedInstance == undefined) {
				GameManager._sharedInstance = new GameManager();
				GameManager._sharedInstance._gameState = GAME_STATE_INACTIVE;
				GameManager._sharedInstance._score = 0;
				GameManager._sharedInstance._highscore = 0;
				GameManager._sharedInstance._hasSetName = false;
			}

			return GameManager._sharedInstance;
		}
	}]);

	return GameManager;
}();