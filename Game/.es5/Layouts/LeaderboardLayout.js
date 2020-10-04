"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeaderboardLandscapeLayout = function (_LandscapeLayout) {
	_inherits(LeaderboardLandscapeLayout, _LandscapeLayout);

	function LeaderboardLandscapeLayout() {
		_classCallCheck(this, LeaderboardLandscapeLayout);

		return _possibleConstructorReturn(this, (LeaderboardLandscapeLayout.__proto__ || Object.getPrototypeOf(LeaderboardLandscapeLayout)).call(this, "LeaderboardLandscapeLayout"));
	}

	_createClass(LeaderboardLandscapeLayout, [{
		key: "onEnter",
		value: function onEnter() {
			_get(LeaderboardLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(LeaderboardLandscapeLayout.prototype), "onEnter", this).call(this);

			// Set up necessary members
			this.maxEntriesShown = 5;
			this.entries = new Array();
			this.userEntry = { "rank": "-", "name": " ", "score": 0 };

			// Setup the layout
			var layout = new ccui.Layout(cc.winSize);
			layout.setAnchorPoint(0.5, 0.5);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(0.5, 0.5));
			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1.0, 1.0));
			layout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
			layoutParameter.setMargin(0, 0, 0, 0);
			layout.setLayoutParameter(layoutParameter);

			this.createLeaderboardTitleText(layout);
			this.setEntries();
			this.createLeaderboardHeaders(layout);
			this.createButton(layout, "BACK", this.onClickBack);

			this.addChild(layout);
		}

		// Creates the leaderboard headers and their corresponding data

	}, {
		key: "createLeaderboardHeaders",
		value: function createLeaderboardHeaders(parent) {
			for (var i = 0; i < 3; i++) {
				var spanRatio = 0;
				if (i === 1) {
					spanRatio = 1 / 5;
				} else {
					spanRatio = i / 3;
				}

				var layout = new ccui.VBox();
				layout.setAnchorPoint(0.0, 1.0);
				layout.setPositionType(ccui.Widget.POSITION_PERCENT);
				layout.setPositionPercent(cc.p(spanRatio, 0.8));

				layout.setSizeType(ccui.Widget.SIZE_PERCENT);
				layout.setSizePercent(cc.p(1 / 3, 0.8));

				layout.addComponent(new FitToParent());

				var layoutParameter = new ccui.RelativeLayoutParameter();
				layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
				layoutParameter.setMargin(0, 0, 0, 0);
				layout.setLayoutParameter(layoutParameter);

				switch (i) {
					case 0:
						{
							this.createRankEntries(layout);
						}break;
					case 1:
						{
							this.createNameEntries(layout);
						}break;
					case 2:
						{
							this.createScoreEntries(layout);
						}break;
				}
				parent.addChild(layout);
			}
		}
	}, {
		key: "createRankEntries",
		value: function createRankEntries(parent) {
			var rankHeader = "Rank";
			var rankText = new Text("RankHeader", rankHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			rankText.setAnchorPoint(0.0, 0.5);
			parent.addChild(rankText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].rank;
				var entryText = new Text("RankEntry" + i, entryLabel, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
					color: cc.color(25, 25, 25, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Adds entry of the user
			var userHeader = new Text("UserHeader", "User:", res.PixelFont.name, 28, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			var userRank = new Text("UserHeader", this.userEntry.rank, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userRank.setAnchorPoint(0.0, 0.5);
			parent.addChild(userRank);
		}
	}, {
		key: "createNameEntries",
		value: function createNameEntries(parent) {
			var nameHeader = "Name";
			var nameText = new Text("NameHeader", nameHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			nameText.setAnchorPoint(0.0, 0.5);
			parent.addChild(nameText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].name;
				var entryText = new Text("NameEntry" + i, entryLabel, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
					color: cc.color(0, 0, 0, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Adds entry of the user
			var userHeader = new Text("UserHeader", " ", res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			var userName = new Text("UserName", this.userEntry.name, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userName.setAnchorPoint(0.0, 0.5);
			parent.addChild(userName);
		}
	}, {
		key: "createScoreEntries",
		value: function createScoreEntries(parent) {
			var scoreHeader = "Score";
			var scoreText = new Text("ScoreHeader", scoreHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			scoreText.setAnchorPoint(0.0, 0.5);
			parent.addChild(scoreText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].score;
				var entryText = new Text("ScoreEntry" + i, entryLabel, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
					color: cc.color(0, 0, 0, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Adds entry of the user
			var userHeader = new Text("UserHeader", " ", res.PixelFont.name, 28, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			var userScore = new Text("UserScore", this.userEntry.score, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userScore.setAnchorPoint(0.0, 0.5);
			parent.addChild(userScore);
		}

		// Sets the value of the entries and user attribute that will be shown in the leaderboard

	}, {
		key: "setEntries",
		value: function setEntries() {
			var rankedEntries = ScoreManager.getInstance().orderedRanks;

			console.log(rankedEntries);

			for (var i = 0; i < rankedEntries.length; i++) {
				this.entries.push({ "rank": i + 1, "name": rankedEntries[i].name, "score": rankedEntries[i].score });
			}

			if (ScoreManager.getInstance().playerInfo !== undefined) this.userEntry = ScoreManager.getInstance().playerInfo;
		}
	}, {
		key: "createLeaderboardTitleText",
		value: function createLeaderboardTitleText(parent) {
			var prompt = "Leaderboard";
			parent.addChild(new Text("Leaderboard", prompt, res.PixelFont.name, 48, cc.p(0.5, 0.9), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));
		}

		// Create a button

	}, {
		key: "createButton",
		value: function createButton(parent, text, bindingFunction) {
			var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
			button.setName(text);
			button.setScale9Enabled(true);
			button.setCapInsets(cc.rect(20, 20, 20, 20));
			button.setContentSize(cc.size(125, 55));
			button.setTitleFontSize(32);
			button.setTitleFontName("Pixel");
			button.setTitleText(text);
			button.setPositionType(ccui.Widget.POSITION_PERCENT);
			button.setPositionPercent(cc.p(1.0, 0.05));
			button.setAnchorPoint(cc.p(1.0, 0.0));
			button.addComponent(new FitToParent());

			// Binds function to the button for click event
			button.addClickEventListener(bindingFunction.bind(this));
			parent.addChild(button);
		}
	}, {
		key: "onClickBack",
		value: function onClickBack() {
			cc.director.runScene(new MainMenuScene());
		}
	}]);

	return LeaderboardLandscapeLayout;
}(LandscapeLayout);

var LeaderboardPortraitLayout = function (_PortraitLayout) {
	_inherits(LeaderboardPortraitLayout, _PortraitLayout);

	function LeaderboardPortraitLayout() {
		_classCallCheck(this, LeaderboardPortraitLayout);

		return _possibleConstructorReturn(this, (LeaderboardPortraitLayout.__proto__ || Object.getPrototypeOf(LeaderboardPortraitLayout)).call(this, "LeaderboardPortraitLayout"));
	}

	_createClass(LeaderboardPortraitLayout, [{
		key: "onEnter",
		value: function onEnter() {
			_get(LeaderboardPortraitLayout.prototype.__proto__ || Object.getPrototypeOf(LeaderboardPortraitLayout.prototype), "onEnter", this).call(this);

			// Setup necessary attributes
			this.maxEntriesShown = 5;
			this.entries = new Array();
			this.userEntry = { "rank": "-", "name": " ", "score": 0 };

			// Setup layout
			var layout = new ccui.Layout(cc.winSize);
			layout.setAnchorPoint(0.5, 0.5);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(0.5, 0.5));
			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1.0, 1.0));

			layout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
			layoutParameter.setMargin(0, 0, 0, 0);
			layout.setLayoutParameter(layoutParameter);

			this.createLeaderboardTitleText(layout);
			this.setEntries();
			this.createLeaderboardHeaders(layout);
			this.createButton(layout, "BACK", this.onClickBack);

			this.addChild(layout);
		}

		// Creates the leaderboard headers and their corresponding data

	}, {
		key: "createLeaderboardHeaders",
		value: function createLeaderboardHeaders(parent) {
			for (var i = 0; i < 3; i++) {
				var layout = new ccui.VBox();
				layout.setAnchorPoint(0.0, 1.0);
				layout.setPositionType(ccui.Widget.POSITION_PERCENT);
				layout.setPositionPercent(cc.p(i / 3, 0.8));

				layout.setSizeType(ccui.Widget.SIZE_PERCENT);
				layout.setSizePercent(cc.p(1 / 3, 0.8));

				layout.addComponent(new FitToParent());

				var layoutParameter = new ccui.RelativeLayoutParameter();
				layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
				layoutParameter.setMargin(0, 0, 0, 0);
				layout.setLayoutParameter(layoutParameter);

				switch (i) {
					case 0:
						{
							this.createRankEntries(layout);
						}break;
					case 1:
						{
							this.createNameEntries(layout);
						}break;
					case 2:
						{
							this.createScoreEntries(layout);
						}break;
				}
				parent.addChild(layout);
			}
		}
	}, {
		key: "createRankEntries",
		value: function createRankEntries(parent) {
			var rankHeader = "Rank";
			var rankText = new Text("RankHeader", rankHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			rankText.setAnchorPoint(0.0, 0.5);
			parent.addChild(rankText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].rank;
				var entryText = new Text("RankEntry" + i, entryLabel, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
					color: cc.color(0, 0, 0, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Add user entry
			var userHeader = new Text("UserHeader", "User:", res.PixelFont.name, 28, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			console.log("USER RANK: " + this.userEntry.rank);

			var userRank = new Text("UserHeader", this.userEntry.rank, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userRank.setAnchorPoint(0.0, 0.5);
			parent.addChild(userRank);
		}
	}, {
		key: "createNameEntries",
		value: function createNameEntries(parent) {
			var nameHeader = "Name";
			var nameText = new Text("NameHeader", nameHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			nameText.setAnchorPoint(0.0, 0.5);
			parent.addChild(nameText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].name;
				var entryText = new Text("NameEntry" + i, entryLabel, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
					color: cc.color(0, 0, 0, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Add user entry
			var userHeader = new Text("UserHeader", " ", res.PixelFont.name, 28, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			var userName = new Text("UserName", this.userEntry.name, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userName.setAnchorPoint(0.0, 0.5);
			parent.addChild(userName);
		}
	}, {
		key: "createScoreEntries",
		value: function createScoreEntries(parent) {
			var scoreHeader = "Score";
			var scoreText = new Text("ScoreHeader", scoreHeader, res.PixelFont.name, 30, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			scoreText.setAnchorPoint(0.0, 0.5);
			parent.addChild(scoreText);

			// Add entries
			for (var i = 0; i < this.maxEntriesShown; i++) {
				if (i === this.entries.length) {
					break;
				}

				var entryLabel = this.entries[i].score;

				var entryText = new Text("ScoreEntry" + i, entryLabel, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
					color: cc.color(0, 0, 0, 255),
					stroke: 2
				});

				entryText.setAnchorPoint(0.0, 0.5);
				parent.addChild(entryText);
			}

			// Add user entry
			var userHeader = new Text("UserHeader", " ", res.PixelFont.name, 28, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

			userHeader.setAnchorPoint(0.0, 0.5);
			parent.addChild(userHeader);

			var userScore = new Text("UserScore", this.userEntry.score, res.PixelFont.name, 24, cc.p(0.0, 0.0), {
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userScore.setAnchorPoint(0.0, 0.5);
			parent.addChild(userScore);
		}

		// Sets the value of the entries and user attribute that will be shown in the leaderboard

	}, {
		key: "setEntries",
		value: function setEntries() {
			var rankedEntries = ScoreManager.getInstance().orderedRanks;

			console.log(rankedEntries);

			for (var i = 0; i < rankedEntries.length; i++) {
				this.entries.push({ "rank": i + 1, "name": rankedEntries[i].name, "score": rankedEntries[i].score });
			}

			if (ScoreManager.getInstance().playerInfo !== undefined) this.userEntry = ScoreManager.getInstance().playerInfo;
		}
	}, {
		key: "createLeaderboardTitleText",
		value: function createLeaderboardTitleText(parent) {
			var prompt = "Leaderboard";
			parent.addChild(new Text("Leaderboard", prompt, res.PixelFont.name, 48, cc.p(0.5, 0.9), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));
		}

		// Create a button

	}, {
		key: "createButton",
		value: function createButton(parent, text, bindingFunction) {
			var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
			button.setName(text);
			button.setScale9Enabled(true);
			button.setCapInsets(cc.rect(20, 20, 20, 20));
			button.setContentSize(cc.size(125, 55));
			button.setTitleFontSize(32);
			button.setTitleFontName("Pixel");
			button.setTitleText(text);
			button.setPositionType(ccui.Widget.POSITION_PERCENT);
			button.setPositionPercent(cc.p(1.0, 0.05));
			button.setAnchorPoint(cc.p(1.0, 0.0));
			button.addComponent(new FitToParent());

			// Binds function to the button for click event
			button.addClickEventListener(bindingFunction.bind(this));
			parent.addChild(button);
		}
	}, {
		key: "onClickBack",
		value: function onClickBack() {
			cc.director.runScene(new MainMenuScene());
		}
	}]);

	return LeaderboardPortraitLayout;
}(PortraitLayout);