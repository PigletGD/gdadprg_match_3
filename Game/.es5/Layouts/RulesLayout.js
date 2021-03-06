"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RulesLandscapeLayout = function (_LandscapeLayout) {
    _inherits(RulesLandscapeLayout, _LandscapeLayout);

    function RulesLandscapeLayout() {
        _classCallCheck(this, RulesLandscapeLayout);

        return _possibleConstructorReturn(this, (RulesLandscapeLayout.__proto__ || Object.getPrototypeOf(RulesLandscapeLayout)).call(this, "RulesLandscapeLayout"));
    }

    _createClass(RulesLandscapeLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(RulesLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(RulesLandscapeLayout.prototype), "onEnter", this).call(this);
            this.createRulesText(this);
            this.createButton(this, "BACK", this.onClickBack);
        }
    }, {
        key: "createRulesText",
        value: function createRulesText(parent) {
            // Creates bounding box of text for sizing
            var rulesLayout = new ccui.Layout(cc.winSize);
            rulesLayout.setAnchorPoint(0.5, 0.5);
            rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
            rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            rulesLayout.setSizePercent(cc.p(0.9, 0.8));
            rulesLayout.addComponent(new FitToParent());

            // Creates relative box to anchor children to specific point
            var layoutParameter = new ccui.RelativeLayoutParameter();
            layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
            layoutParameter.setMargin(0, 10, 0, 0);
            rulesLayout.setLayoutParameter(layoutParameter);
            parent.addChild(rulesLayout);

            // Rules text
            var rules = "RULES:\n\n1.) Click on two adjacent \ntiles to swap their places\n\n2.) Match three or more adjacent \nsame type tiles to earn points\n\n3.) Gain as much points as \npossible within two minutes";

            rulesLayout.addChild(new Text("Rules", rules, res.PixelFont.name, 48, cc.p(0.5, 0.5), {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));
        }

        // Create a button

    }, {
        key: "createButton",
        value: function createButton(parent, text, bindingFunction) {
            // Layout for precise placement
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(0.25, 0.2));
            buttonLayout.addComponent(new FitToParent());

            // Layout for anchoring
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

    return RulesLandscapeLayout;
}(LandscapeLayout);

var RulesPortraitLayout = function (_PortraitLayout) {
    _inherits(RulesPortraitLayout, _PortraitLayout);

    function RulesPortraitLayout() {
        _classCallCheck(this, RulesPortraitLayout);

        return _possibleConstructorReturn(this, (RulesPortraitLayout.__proto__ || Object.getPrototypeOf(RulesPortraitLayout)).call(this, "RulesPortraitLayout"));
    }

    _createClass(RulesPortraitLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(RulesPortraitLayout.prototype.__proto__ || Object.getPrototypeOf(RulesPortraitLayout.prototype), "onEnter", this).call(this);

            this.createRulesText(this);
            this.createButton(this, "BACK", this.onClickBack);
        }
    }, {
        key: "createRulesText",
        value: function createRulesText(parent) {
            // Creates bounding box of text for sizing
            var rulesLayout = new ccui.Layout(cc.winSize);
            rulesLayout.setAnchorPoint(0.5, 0.5);
            rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
            rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            rulesLayout.setSizePercent(cc.p(0.9, 0.8));
            rulesLayout.addComponent(new FitToParent());

            // Creates relative box to anchor children to specific point
            var layoutParameter = new ccui.RelativeLayoutParameter();
            layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
            layoutParameter.setMargin(0, 10, 0, 0);
            rulesLayout.setLayoutParameter(layoutParameter);
            parent.addChild(rulesLayout);

            // Rules text
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

    return RulesPortraitLayout;
}(PortraitLayout);