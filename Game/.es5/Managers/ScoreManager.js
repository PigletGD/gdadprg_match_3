"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreManager = function () {
	function ScoreManager() {
		_classCallCheck(this, ScoreManager);
	}

	_createClass(ScoreManager, [{
		key: "loadUserScoresFromJSON",
		value: function loadUserScoresFromJSON(userJSONList) {
			var users = userJSONList;

			console.log(userJSONList);

			for (var i = 0; i < users.length; i++) {
				console.log(i);

				ScoreManager._sharedInstance.userCache.push(users[i]);
			}

			console.log(ScoreManager._sharedInstance.userCache);
		}
	}, {
		key: "printAllUsers",
		value: function printAllUsers() {
			console.log(ScoreManager._sharedInstance.userCache);

			for (var j = 0; j < ScoreManager._sharedInstance.userCache.length; j++) {
				console.log(ScoreManager._sharedInstance.userCache[j].name);
			}
		}
	}], [{
		key: "getInstance",
		value: function getInstance() {
			if (ScoreManager._sharedInstance == undefined) {
				ScoreManager._sharedInstance = new ScoreManager();
				ScoreManager._sharedInstance.userCache = new Array();
				ScoreManager._sharedInstance.scoreCache = new Array();
			}

			return ScoreManager._sharedInstance;
		}
	}]);

	return ScoreManager;
}();