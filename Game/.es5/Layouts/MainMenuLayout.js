"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenuLandscapeLayout = function (_ccui$Layout) {
    _inherits(MainMenuLandscapeLayout, _ccui$Layout);

    function MainMenuLandscapeLayout() {
        _classCallCheck(this, MainMenuLandscapeLayout);

        var _this = _possibleConstructorReturn(this, (MainMenuLandscapeLayout.__proto__ || Object.getPrototypeOf(MainMenuLandscapeLayout)).call(this, "MainMenuLandscapeLayout"));

        _this.scheduleUpdate();
        return _this;
    }

    _createClass(MainMenuLandscapeLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(MainMenuLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(MainMenuLandscapeLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.addChild(new Text("Title", "Toiree", res.PixelFont.name, 60, cc.p(0.5, 0.7), {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));

            this.createRowOfButtons();

            // TODO: Check if we need to not generate the input layout when a non-unique id is found
            if (!GameManager.getInstance().isNameSet) {
                this.getParent().addChild(new InputNamePopupLayout(this));
            }

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnLandscape());
        }
    }, {
        key: "createRowOfButtons",
        value: function createRowOfButtons() {
            // Creates linear layout for vertical box layout positioning
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(1.0, 0.5));
            buttonLayout.setName("Buttons");
            this.addChild(buttonLayout);

            for (var i = 0; i < 3; i++) {
                // Creates three vertical layouts to divide the buttons
                var divisions = 3;
                // Setting up properties of vertical layout
                var vertLayout = new ccui.VBox();
                vertLayout.setName("Choices" + i);
                vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
                vertLayout.setSizePercent(cc.p(1 / divisions, 1.0));
                vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
                vertLayout.setPositionPercent(cc.p(i / divisions, -1.0));

                vertLayout.addComponent(new FitToParent());
                buttonLayout.addChild(vertLayout);

                if (i === 0) {
                    this.createButton(vertLayout, "PLAY", this.onClickPlay);
                } else if (i === 1) {
                    this.createButton(vertLayout, "RULES", this.onClickPlay);
                } else {
                    this.createButton(vertLayout, "LEADERBOARD", this.onClickLeaderboard);
                }
            }
        }

        // Create a button

    }, {
        key: "createButton",
        value: function createButton(parent, text, bindingFunction) {
            // Sets ups button with 9-slice
            var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

            button.setScale9Enabled(true);
            button.setCapInsets(cc.rect(20, 20, 20, 20));
            button.setContentSize(cc.size(300, 125));

            button.setTitleFontSize(48);
            button.setTitleFontName("Pixel");
            button.setTitleText(text);
            button.setName(text);

            if (!GameManager.getInstance().isNameSet) {
                button.setTouchEnabled(false);
            }

            var layoutParameter = new ccui.LinearLayoutParameter();
            layoutParameter.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
            layoutParameter.setMargin(0, -70, 0, 0);
            button.setLayoutParameter(layoutParameter);

            button.addComponent(new FitToParent());

            // Binds function to the button for click event
            button.addClickEventListener(bindingFunction.bind(this));
            parent.addChild(button);
        }

        // Goes to play scene

    }, {
        key: "onClickPlay",
        value: function onClickPlay() {
            console.log("play");
            GameManager.getInstance().resumeGame();
            GameManager.getInstance().score = 0;
            cc.director.runScene(new MainGameScene());
        }

        // Goes to rule scene

    }, {
        key: "onClickRules",
        value: function onClickRules() {
            cc.director.runScene(new RulesScene());
        }

        //Go to leaderboard scene

    }, {
        key: "onClickLeaderboard",
        value: function onClickLeaderboard() {
            cc.director.runScene(new LeaderboardScene());
        }

        // Creates pop-up quit confirmation menu

    }, {
        key: "onClickQuit",
        value: function onClickQuit() {
            console.log("quit");
        }
    }]);

    return MainMenuLandscapeLayout;
}(ccui.Layout);

var MainMenuPortraitLayout = function (_PortraitLayout) {
    _inherits(MainMenuPortraitLayout, _PortraitLayout);

    function MainMenuPortraitLayout() {
        _classCallCheck(this, MainMenuPortraitLayout);

        return _possibleConstructorReturn(this, (MainMenuPortraitLayout.__proto__ || Object.getPrototypeOf(MainMenuPortraitLayout)).call(this, "MainMenuPortraitLayout"));
    }

    _createClass(MainMenuPortraitLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(MainMenuPortraitLayout.prototype.__proto__ || Object.getPrototypeOf(MainMenuPortraitLayout.prototype), "onEnter", this).call(this);

            this.createTitle();
            this.createColumnOfButtons();
        }

        // Creates title layout to be anchored to top of relative layout

    }, {
        key: "createTitle",
        value: function createTitle() {
            // Creates linear layout for text positioning
            var titleLayout = new ccui.Layout(cc.winSize);
            titleLayout.setAnchorPoint(0.5, 0.5);
            titleLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            titleLayout.setPositionPercent(cc.p(0.5, 0.7));
            titleLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            titleLayout.setSizePercent(cc.p(0.75, 0.3));
            titleLayout.addComponent(new FitToParent());

            // Sets up layout parameters
            var layoutParameter = new ccui.RelativeLayoutParameter();
            layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
            titleLayout.setLayoutParameter(layoutParameter);
            this.addChild(titleLayout);

            // Creates and childs title text to title layout
            titleLayout.addChild(new Text("Title", "Toiree", res.PixelFont.name, 60, cc.p(0.5, 0.7), {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));
        }

        // Creates button layout to be anchored to bottom of relative layout

    }, {
        key: "createColumnOfButtons",
        value: function createColumnOfButtons() {
            // Creates linear layout for vertical box layout positioning
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(0.70, 0.45));
            buttonLayout.addComponent(new FitToParent());

            // Debug to see the rect bounds of the layout
            //buttonLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            //buttonLayout.setBackGroundColor(cc.color(0, 150, 0, 255));

            // Sets up layout parameters
            var layoutParameter = new ccui.RelativeLayoutParameter();
            layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
            // layoutParameter.setMargin(10, 0, 0, 0);
            buttonLayout.setLayoutParameter(layoutParameter);
            this.addChild(buttonLayout);

            // Creates a vertical layout to be childed to button layout
            this.createVerticalLayout(buttonLayout);
        }

        // Creates a vertical layout

    }, {
        key: "createVerticalLayout",
        value: function createVerticalLayout(parent) {
            // Setting up properties of vertical layout
            var vertLayout = new ccui.VBox();
            vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setSizePercent(cc.p(1.0, 1.0));
            vertLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            vertLayout.setPositionPercent(cc.p(0.0, 0.4));
            //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            //vertLayout.setBackGroundColor(cc.color(150, 0, 0,255));
            vertLayout.addComponent(new FitToParent());
            parent.addChild(vertLayout);

            // Creates the three buttons to be attached to the vertical layout with functions to be binded
            this.createButton(vertLayout, "PLAY", this.onClickPlay);
            this.createButton(vertLayout, "RULES", this.onClickRules);
            // this.createButton(vertLayout, "LEADERBOARD", this.onClickRules);
        }

        // Create a button

    }, {
        key: "createButton",
        value: function createButton(parent, text, bindingFunction) {
            // Sets ups button with 9-slice
            var button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
            button.setName(text);
            button.setScale9Enabled(true);
            button.setCapInsets(cc.rect(20, 20, 20, 20));
            button.setContentSize(cc.size(300, 125));
            button.setTitleFontSize(48);
            button.setTitleFontName("Pixel");
            button.setTitleText(text);

            var layoutParameter = new ccui.LinearLayoutParameter();
            layoutParameter.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
            layoutParameter.setMargin(0, 0, 0, 0);
            button.setLayoutParameter(layoutParameter);

            button.addComponent(new FitToParent());

            // Binds function to the button for click event
            button.addClickEventListener(bindingFunction.bind(this));
            parent.addChild(button);
        }

        // Goes to play scene

    }, {
        key: "onClickPlay",
        value: function onClickPlay() {
            console.log("play");
            GameManager.getInstance().resumeGame();
            GameManager.getInstance().score = 0;
            cc.director.runScene(new MainGameScene());
        }

        // Goes to rule scene

    }, {
        key: "onClickRules",
        value: function onClickRules() {
            cc.director.runScene(new RulesScene());
        }

        // Creates pop-up quit confirmation menu

    }, {
        key: "onClickQuit",
        value: function onClickQuit() {
            console.log("quit");
        }
    }]);

    return MainMenuPortraitLayout;
}(PortraitLayout);