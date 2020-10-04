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
			// this.createLeaderboardTitleText(this);
			// this.createButton(this, "BACK", this.onClickBack);

			var layout = new ccui.Layout(cc.winSize);
			layout.setAnchorPoint(0.5, 0.5);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(0.5, 0.5));
			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1.0, 1.0));
			// layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			// layout.setBackGroundColor(cc.color(0, 0, 150, 255));
			layout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
			layoutParameter.setMargin(0, 0, 0, 0);
			layout.setLayoutParameter(layoutParameter);

			var rules = "Leaderboard";

			layout.addChild(new Text("Leaderboard", rules, res.PixelFont.name, 48, cc.p(0.5, 0.9), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));

			var entries = [{ "rank": 0, "name": "TEST", "score": 100 }, { "rank": 0, "name": "TEST", "score": 100 }, { "rank": 0, "name": "TEST", "score": 100 }];

			var buttonLayout = new ccui.Layout(cc.winSize);
			buttonLayout.setAnchorPoint(0.5, 0.5);
			buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
			buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
			buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
			buttonLayout.setSizePercent(cc.p(1.0, 1.0));
			buttonLayout.setName("Buttons");
			this.addChild(buttonLayout);

			var divisions = 3;
			for (var i = 0; i < divisions; i++) {
				// Setting up properties of vertical layout
				var vertLayout = new ccui.VBox();
				vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
				vertLayout.setSizePercent(cc.p(1 / divisions, 1.0));
				vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
				vertLayout.setPositionPercent(cc.p(i / divisions, -1.0));

				vertLayout.addComponent(new FitToParent());
				buttonLayout.addChild(vertLayout);

				if (i === 0) {
					this.createTextPercent(vertLayout, "RANK", "Rank", 0.5, 0.0, 30);
				}
				if (i === 1) {
					this.createTextPercent(vertLayout, "RANK", "Name", 0.5, 0.0, 30);
				}
				if (i === 2) {
					this.createTextPercent(vertLayout, "RANK", "Score", 0.5, 0.0, 30);
				}
			}

			this.addChild(layout);
		}
	}, {
		key: "createTextPercent",
		value: function createTextPercent(parent, name, message, x, y, size) {
			var text = new ccui.Text(message, "Pixel", size);
			text.setName(name);
			text.setPositionType(ccui.Widget.POSITION_PERCENT);
			text.setPositionPercent(cc.p(x, y));
			text.enableOutline(cc.color(0, 0, 0, 255), 4);
			parent.addChild(text);
			text.addComponent(new FitToParent());
		}

		/****
  Entry
  {
  	"rank": 0
  	"name": <name>,
  	"score": <score>
  }
  */

	}, {
		key: "createLeaderboardEntry",
		value: function createLeaderboardEntry(parent, entriesInfo) {
			// let vertLayout = new ccui.VBox();
			// vertLayout.setContentSize(cc.winSize);
			//  vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
			//  vertLayout.setSizePercent(cc.p(0.5, 0.5));
			//  vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
			//  vertLayout.setPositionPercent(cc.p(0.0, 0.0));

			// for (let i = 0; i < entriesInfo.length; i++)
			// {
			// 	vertLayout.addChild(this.createEntryContainer(entriesInfo[i]));
			// }

			parent.addChild(this.createEntryContainer(entriesInfo[0]));
		}
	}, {
		key: "createEntryContainer",
		value: function createEntryContainer(entry) {

			var hortLayout = new ccui.HBox();

			var rankText = new Text2("RankText");
			rankText.setFontName(res.PixelFont.name);
			rankText.setString("Rank");
			rankText.setFontSize(30);
			rankText.setAnchorPoint(0.0, 0.5);

			var layoutParameter = new ccui.LinearLayoutParameter();
			layoutParameter.setGravity(ccui.LinearLayoutParameter.TOP);
			layoutParameter.setMargin(50, 0, 0, 0);
			rankText.setLayoutParameter(layoutParameter);

			hortLayout.addChild(rankText);
			return hortLayout;
		}
	}, {
		key: "createLeaderboardTitleText",
		value: function createLeaderboardTitleText(parent) {
			var layout = new ccui.Layout(cc.winSize);
			layout.setAnchorPoint(0.5, 0.5);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(0.5, 0.5));
			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1.0, 1.0));
			layout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
			layoutParameter.setMargin(0, 10, 0, 0);
			layout.setLayoutParameter(layoutParameter);
			parent.addChild(layout);
		}

		// Create a button

	}, {
		key: "createButton",
		value: function createButton(parent, text, bindingFunction) {
			var buttonLayout = new ccui.Layout(cc.winSize);
			buttonLayout.setAnchorPoint(0.5, 0.5);
			buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
			buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
			buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
			buttonLayout.setSizePercent(cc.p(0.25, 0.2));
			//buttonLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			//buttonLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
			buttonLayout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
			layoutParameter.setMargin(0, 0, 0, 0);
			buttonLayout.setLayoutParameter(layoutParameter);
			parent.addChild(buttonLayout);

			// Sets ups button with 9-slice
			var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
			button.setName(text);
			button.setScale9Enabled(true);
			button.setCapInsets(cc.rect(20, 20, 20, 20));
			button.setContentSize(cc.size(300, 125));
			button.setTitleFontSize(60);
			button.setTitleFontName("Pixel");
			button.setTitleText(text);
			button.setPositionType(ccui.Widget.POSITION_PERCENT);
			button.setPositionPercent(cc.p(0.5, 0.5));
			//button.setAnchorPoint(cc.p(1.0, 1.0));
			button.addComponent(new FitToParent());

			// Binds function to the button for click event
			button.addClickEventListener(bindingFunction.bind(this));
			buttonLayout.addChild(button);
		}
	}, {
		key: "onClickBack",
		value: function onClickBack() {
			ScoreManager.getInstance().printAllUsers();
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

			this.createRulesText(this);
			this.createButton(this, "BACK", this.onClickBack);
		}
	}, {
		key: "createRulesText",
		value: function createRulesText(parent) {
			var rulesLayout = new ccui.Layout(cc.winSize);
			rulesLayout.setAnchorPoint(0.5, 0.5);
			rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
			rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
			rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
			rulesLayout.setSizePercent(cc.p(0.9, 0.8));
			//rulesLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			//rulesLayout.setBackGroundColor(cc.color(0, 150, 0, 255));
			rulesLayout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
			layoutParameter.setMargin(0, 10, 0, 0);
			rulesLayout.setLayoutParameter(layoutParameter);
			parent.addChild(rulesLayout);

			var rules = "RULES:\n\n1.) Click on two\nadjacent tiles to\nswap their places\n\n2.) Match three or\nmore adjacent same\ntype tiles to earn\npoints\n\n3.) Gain as much\npoints as possible\nwithin two minutes";

			rulesLayout.addChild(new Text("Rules", rules, res.PixelFont.name, 48, cc.p(0.5, 0.5), {
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));
		}

		// Create a button

	}, {
		key: "createButton",
		value: function createButton(parent, text, bindingFunction) {
			var buttonLayout = new ccui.Layout(cc.winSize);
			buttonLayout.setAnchorPoint(0.5, 0.5);
			buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
			buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
			buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
			buttonLayout.setSizePercent(cc.p(0.45, 0.2));
			// buttonLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			// buttonLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
			buttonLayout.addComponent(new FitToParent());

			var layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
			layoutParameter.setMargin(0, 0, 0, 0);
			buttonLayout.setLayoutParameter(layoutParameter);
			parent.addChild(buttonLayout);

			// Sets ups button with 9-slice
			var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
			button.setName(text);
			button.setScale9Enabled(true);
			button.setCapInsets(cc.rect(20, 20, 20, 20));
			button.setContentSize(cc.size(300, 125));
			button.setTitleFontSize(60);
			button.setTitleFontName("Pixel");
			button.setTitleText(text);
			button.setPositionType(ccui.Widget.POSITION_PERCENT);
			button.setPositionPercent(cc.p(0.5, 0.5));
			//button.setAnchorPoint(cc.p(1.0, 1.0));
			button.addComponent(new FitToParent());

			// Binds function to the button for click event
			button.addClickEventListener(bindingFunction.bind(this));
			buttonLayout.addChild(button);
		}
	}, {
		key: "onClickBack",
		value: function onClickBack() {
			cc.director.runScene(new MainMenuScene());
		}
	}]);

	return LeaderboardPortraitLayout;
}(PortraitLayout);