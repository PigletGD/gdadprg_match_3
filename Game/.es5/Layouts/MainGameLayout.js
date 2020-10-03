"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainGameLandscapeLayout = function (_ccui$RelativeBox) {
    _inherits(MainGameLandscapeLayout, _ccui$RelativeBox);

    function MainGameLandscapeLayout() {
        _classCallCheck(this, MainGameLandscapeLayout);

        var _this = _possibleConstructorReturn(this, (MainGameLandscapeLayout.__proto__ || Object.getPrototypeOf(MainGameLandscapeLayout)).call(this));

        _this.setName("MainGameLandscapeLayout");
        _this.scheduleUpdate();
        _this.timeText;
        _this.scoreText;
        return _this;
    }

    _createClass(MainGameLandscapeLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(MainGameLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(MainGameLandscapeLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.createStatsText(this);
            this.createButton(this, "PAUSE", this.onClickPause);

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnLandscape());
        }
    }, {
        key: "createStatsText",
        value: function createStatsText(parent) {
            var statsLayout = new ccui.Layout(cc.winSize);
            statsLayout.setAnchorPoint(0.0, 0.0);
            statsLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            statsLayout.setSizePercent(cc.p(0.2, 0.5));
            //statsLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            //statsLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
            statsLayout.addComponent(new FitToParent());

            var layoutParameter = new ccui.RelativeLayoutParameter();
            layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_CENTER_VERTICAL);
            layoutParameter.setMargin(0, 0, 0, 0);
            statsLayout.setLayoutParameter(layoutParameter);
            parent.addChild(statsLayout);

            var uiContainer = new ccui.ImageView();
            uiContainer.loadTexture(res.TPHoloder_png);
            uiContainer.addComponent(new FitToParent());
            uiContainer.setAnchorPoint(0.05, -0.45);
            statsLayout.addChild(uiContainer);

            var vertLayout = new ccui.VBox();
            vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setSizePercent(cc.p(0.7, 0.7));
            uiContainer.addChild(vertLayout);

            this.timeText = new Text("Time", "Time", res.PixelFont.name, 80, cc.p(0.5, 0.7), {
                color: cc.color(0, 0, 0, 255),
                stroke: 8
            });

            this.timeText.setName("Time");
            this.timeText.setAnchorPoint(0.0, 0.0);

            var timeLayoutParameter = new ccui.LinearLayoutParameter();
            timeLayoutParameter.setGravity(ccui.LinearLayoutParameter.LEFT);
            timeLayoutParameter.setMargin(100, 20, 0, 0);
            this.timeText.setLayoutParameter(timeLayoutParameter);
            vertLayout.addChild(this.timeText);

            this.scoreText = new Text("Score", "Score", res.PixelFont.name, 80, cc.p(0.5, 0.7), {
                color: cc.color(0, 0, 0, 255),
                stroke: 8
            });

            this.scoreText.setAnchorPoint(0.0, 0.0);

            var scoreLayoutParameter = new ccui.LinearLayoutParameter();
            scoreLayoutParameter.setGravity(ccui.LinearLayoutParameter.LEFT);
            scoreLayoutParameter.setMargin(100, 20, 0, 0);
            this.scoreText.setLayoutParameter(scoreLayoutParameter);
            vertLayout.addChild(this.scoreText);
        }

        // Create a button

    }, {
        key: "createButton",
        value: function createButton(parent, text, bindingFunction) {
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setName("Button Layout");
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(0.20, 0.15));
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
        key: "onClickPause",
        value: function onClickPause() {
            if (!GameManager.getInstance().isPaused()) {
                this.getParent().addChild(new PausePopupLayout());
                GameManager.getInstance().pauseGame();
                this.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
            }
            console.log(GameManager.getInstance().isPaused());
        }
    }, {
        key: "update",
        value: function update(timestep) {
            _get(MainGameLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(MainGameLandscapeLayout.prototype), "update", this).call(this, timestep);
            this.updateTimeText();
            this.updateScoreText();
        }
    }, {
        key: "updateTimeText",
        value: function updateTimeText() {
            var timeRemaining = this.getParent().getChildByName("TimerEntity").remainingSeconds;
            timeRemaining = Math.floor(timeRemaining);
            if (timeRemaining < 0) {
                timeRemaining = 0;
            }
            this.timeText.setString("Time: " + timeRemaining.toString());
        }
    }, {
        key: "updateScoreText",
        value: function updateScoreText() {
            var score = GameManager.getInstance().score;
            this.scoreText.setString("Score: " + score.toString());
        }
    }]);

    return MainGameLandscapeLayout;
}(ccui.RelativeBox);

var MainGamePortraitLayout = function (_ccui$RelativeBox2) {
    _inherits(MainGamePortraitLayout, _ccui$RelativeBox2);

    function MainGamePortraitLayout() {
        _classCallCheck(this, MainGamePortraitLayout);

        var _this2 = _possibleConstructorReturn(this, (MainGamePortraitLayout.__proto__ || Object.getPrototypeOf(MainGamePortraitLayout)).call(this));

        _this2.setName("MainGamePortraitLayout");
        _this2.scheduleUpdate();
        _this2.timeText;
        _this2.scoreText;
        return _this2;
    }

    _createClass(MainGamePortraitLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(MainGamePortraitLayout.prototype.__proto__ || Object.getPrototypeOf(MainGamePortraitLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.createStatsText(this);
            this.createButton(this, "PAUSE", this.onClickPause);

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnPortrait());
        }
    }, {
        key: "createStatsText",
        value: function createStatsText(parent) {
            // let statsLayout = new ccui.Layout(cc.winSize);
            // statsLayout.setAnchorPoint(0.0, 0.0);
            // statsLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            // statsLayout.setSizePercent(cc.p(0.2, 0.5));
            // //statsLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // //statsLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
            // statsLayout.addComponent(new FitToParent());

            // let layoutParameter = new ccui.RelativeLayoutParameter();
            // layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_CENTER_VERTICAL);
            // layoutParameter.setMargin(0, 0, 0, 0);
            // statsLayout.setLayoutParameter(layoutParameter);
            // parent.addChild(statsLayout);

            // let uiContainer = new ccui.ImageView();
            // uiContainer.loadTexture(res.TPHoloder_png);
            // uiContainer.addComponent(new FitToParent());
            // uiContainer.setAnchorPoint(0.05, -0.45);
            // statsLayout.addChild(uiContainer);

            // let vertLayout = new ccui.VBox();
            // vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            // vertLayout.setSizePercent(cc.p(0.7, 0.7));
            // uiContainer.addChild(vertLayout);

            this.timeText = new Text("Time", "Time", res.PixelFont.name, 24, cc.p(0.0, 0.0), {
                color: cc.color(0, 0, 0, 255),
                stroke: 2
            });

            this.timeText.setAnchorPoint(0.0, 0.0);
            var timeLayoutParameter = new ccui.RelativeLayoutParameter();
            timeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
            timeLayoutParameter.setMargin(20, 0, 0, 0);
            this.timeText.setLayoutParameter(timeLayoutParameter);
            parent.addChild(this.timeText);

            this.scoreText = new Text("Score", "Score", res.PixelFont.name, 24, cc.p(0.0, 0.0), {
                color: cc.color(0, 0, 0, 255),
                stroke: 2
            });

            var scoreLayoutParameter = new ccui.RelativeLayoutParameter();
            scoreLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_RIGHT);
            scoreLayoutParameter.setMargin(0, 0, 20, 0);
            this.scoreText.setLayoutParameter(scoreLayoutParameter);
            parent.addChild(this.scoreText);
        }

        // Create a button

    }, {
        key: "createButton",
        value: function createButton(parent, text, bindingFunction) {
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setName("Button Layout");
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(0.20, 0.15));
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
        key: "onClickPause",
        value: function onClickPause() {
            if (!GameManager.getInstance().isPaused()) {
                this.getParent().addChild(new PausePopupLayout());
                GameManager.getInstance().pauseGame();
                this.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
            }
            console.log(GameManager.getInstance().isPaused());
        }
    }, {
        key: "update",
        value: function update(timestep) {
            _get(MainGamePortraitLayout.prototype.__proto__ || Object.getPrototypeOf(MainGamePortraitLayout.prototype), "update", this).call(this, timestep);
            this.updateTimeText();
            this.updateScoreText();
        }
    }, {
        key: "updateTimeText",
        value: function updateTimeText() {
            var timeRemaining = this.getParent().getChildByName("TimerEntity").remainingSeconds;
            timeRemaining = Math.floor(timeRemaining);
            if (timeRemaining < 0) {
                timeRemaining = 0;
            }
            this.timeText.setString("Time: " + timeRemaining.toString());
        }
    }, {
        key: "updateScoreText",
        value: function updateScoreText() {
            var score = GameManager.getInstance().score;
            this.scoreText.setString("Score: " + score.toString());
        }
    }]);

    return MainGamePortraitLayout;
}(ccui.RelativeBox);