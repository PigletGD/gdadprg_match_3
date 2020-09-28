"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitlePortraitLayout = function (_ccui$RelativeBox) {
    _inherits(TitlePortraitLayout, _ccui$RelativeBox);

    function TitlePortraitLayout() {
        _classCallCheck(this, TitlePortraitLayout);

        var _this = _possibleConstructorReturn(this, (TitlePortraitLayout.__proto__ || Object.getPrototypeOf(TitlePortraitLayout)).call(this));

        _this.setName("TitleLandscapeUI");
        _this.scheduleUpdate();
        return _this;
    }

    _createClass(TitlePortraitLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(TitlePortraitLayout.prototype.__proto__ || Object.getPrototypeOf(TitlePortraitLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnPortrait());

            this.createTitle();
            this.createColumnOfButtons();
        }

        // Creates text using pixel percentaging

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
            this.createTextPercent(titleLayout, "Title", "Title of Game", 0.5, 0.4, 60);
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

    return TitlePortraitLayout;
}(ccui.RelativeBox);