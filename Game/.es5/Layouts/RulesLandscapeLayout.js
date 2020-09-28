"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RulesLandscapeLayout = function (_ccui$RelativeBox) {
    _inherits(RulesLandscapeLayout, _ccui$RelativeBox);

    function RulesLandscapeLayout() {
        _classCallCheck(this, RulesLandscapeLayout);

        var _this = _possibleConstructorReturn(this, (RulesLandscapeLayout.__proto__ || Object.getPrototypeOf(RulesLandscapeLayout)).call(this));

        _this.setName("RulesLandscapeLayout");
        _this.scheduleUpdate();
        return _this;
    }

    _createClass(RulesLandscapeLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(RulesLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(RulesLandscapeLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.createRulesText(this);
            this.createButton(this, "BACK", this.onClickBack);

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnLandscape());
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

            var rules = "RULES:\n\n1.) Click on two adjacent \ntiles to swap their places\n\n2.) Match three or more adjacent \nsame type tiles to earn points\n\n3.) Gain as much points as \npossible within two minutes";
            this.createTextPercent(rulesLayout, "RulesText", rules, 0.5, 0.5, 48);
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
            cc.director.runScene(new MainMenuScene());
        }
    }]);

    return RulesLandscapeLayout;
}(ccui.RelativeBox);