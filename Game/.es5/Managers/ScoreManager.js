"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreManager = function () {
	function ScoreManager() {
		_classCallCheck(this, ScoreManager);
	}

	_createClass(ScoreManager, [{
		key: "loadUserScoresFromJSON",
		value: function loadUserScoresFromJSON(userJSONList, userID) {
			ScoreManager._sharedInstance.userCache = new Array();

			var users = userJSONList;

			for (var i = 0; i < users.length; i++) {
				// Goes through each user in the database and pushes it to the score manager for caching
				ScoreManager._sharedInstance.userCache.push(users[i]);
			}

			// Loads top ranked entries and the user placement in the leaderboard
			ScoreManager._sharedInstance.rankCache = ScoreManager._sharedInstance.getNTopEntries(5, userID);
		}
	}, {
		key: "getNTopEntries",
		value: function getNTopEntries(numOfRanks, userID) {
			var rankedUsers = new Array();
			var cacheSize = ScoreManager._sharedInstance.userCache.length;

			// Initial values for placements
			var lastHighScore = 999999999;
			var currentHighScore = -9999999999;
			var currentIndex = 0;

			for (var i = 0; i < numOfRanks; i++) {
				// Breaks out of the loop if desired rank placements
				// are greater than the number of users in database
				if (i >= cacheSize) {
					break;
				}

				// Cycle through each user
				for (var j = 0; j < cacheSize; j++) {
					// Get user info
					var user = this.userCache[j];
					var userScore = parseInt(user.score);

					if (userScore > currentHighScore) {
						if (userScore < lastHighScore) {
							currentHighScore = userScore;
							currentIndex = j;
						} else if (userScore === lastHighScore) {
							// This check is to see if the user gotten already is
							// marked in the leaderboard
							var isPartOfLeaderboard = false;
							for (var k = 0; k < rankedUsers.length; k++) {
								if (user.id === rankedUsers[k].id) {
									isPartOfLeaderboard = true;
									break;
								}
							}

							if (!isPartOfLeaderboard) {
								// Adds as a potential ranked player in leaderboard
								currentHighScore = userScore;
								currentIndex = j;
							}
						}
					}
				}

				// Pushes the highest valued person found in the list in the leaderboard
				rankedUsers.push(this.userCache[currentIndex]);

				lastHighScore = currentHighScore;
				currentHighScore = -99999999;
				currentIndex = 0;
			}

			ScoreManager._sharedInstance.playerRank = ScoreManager._sharedInstance.getUserRanking(userID, rankedUsers);
			return rankedUsers;
		}
	}, {
		key: "getUserRanking",
		value: function getUserRanking(userID, rankedUsers) {
			var initialRank = 1;
			var cacheSize = ScoreManager._sharedInstance.userCache.length;
			// Initial player info
			var playerIndex = 0;
			var playerUser = void 0;
			var playerUserScore = void 0;

			console.log(rankedUsers);

			for (var i = 0; i < rankedUsers.length; i++) {
				if (userID == rankedUsers[i].id) {
					return { "rank": i + 1, "name": rankedUsers[i].name, "score": rankedUsers[i].score };
				}
			}

			for (var _i = 0; _i < cacheSize; _i++) {
				// Find user in the cache
				if (userID == this.userCache[_i].id) {
					playerUser = this.userCache[_i];
					playerIndex = _i;
					break;
				}
			}

			// Parse json data into int
			playerUserScore = parseInt(playerUser.score);

			for (var j = 0; j < cacheSize; j++) {
				// Checks and see if there is a player ranked above the player
				if (playerIndex != j) {
					var user = this.userCache[j];
					var userScore = parseInt(user.score);

					if (userScore >= playerUserScore) {
						// Demotes the rank of the player
						initialRank++;
					}
				}
			}

			return { "rank": initialRank, "name": playerUser.name, "score": playerUser.score };
		}
	}, {
		key: "printAllUsers",
		value: function printAllUsers() {
			console.log(ScoreManager._sharedInstance.userCache);

			for (var j = 0; j < ScoreManager._sharedInstance.userCache.length; j++) {
				console.log(ScoreManager._sharedInstance.userCache[j].name);
			}
		}
	}, {
		key: "orderedRanks",
		get: function get() {
			return ScoreManager._sharedInstance.rankCache;
		}
	}, {
		key: "playerInfo",
		get: function get() {
			return ScoreManager._sharedInstance.playerRank;
		}
	}], [{
		key: "getInstance",
		value: function getInstance() {
			if (ScoreManager._sharedInstance == undefined) {
				ScoreManager._sharedInstance = new ScoreManager();
				ScoreManager._sharedInstance.userCache = new Array();
				ScoreManager._sharedInstance.scoreCache = new Array();
				ScoreManager._sharedInstance.rankCache = new Array();
			}

			return ScoreManager._sharedInstance;
		}
	}]);

	return ScoreManager;
}();