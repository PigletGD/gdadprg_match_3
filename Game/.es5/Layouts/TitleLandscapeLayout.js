"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitleLandscapeLayout = function (_ccui$Layout) {
    _inherits(TitleLandscapeLayout, _ccui$Layout);

    function TitleLandscapeLayout() {
        _classCallCheck(this, TitleLandscapeLayout);

        var _this = _possibleConstructorReturn(this, (TitleLandscapeLayout.__proto__ || Object.getPrototypeOf(TitleLandscapeLayout)).call(this));

        _this.setName("TitleLandscapeUI");
        _this.scheduleUpdate();
        return _this;
    }

    _createClass(TitleLandscapeLayout, [{
        key: "onEnter",
        value: function onEnter() {
            _get(TitleLandscapeLayout.prototype.__proto__ || Object.getPrototypeOf(TitleLandscapeLayout.prototype), "onEnter", this).call(this);
            this.setContentSize(cc.winSize);

            this.createTextPercent(this, "Title", "Title of Game", 0.5, 0.7, 60);
            this.createRowOfButtons();

            var fitToWindow = new FitToWindow();
            fitToWindow.setName("FitToWindow");

            this.addComponent(new FitToWindow());
            this.addComponent(new EnableOnLandscape());
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
    }, {
        key: "createRowOfButtons",
        value: function createRowOfButtons() {
            // Creates linear layout for vertical box layout positioning
            var buttonLayout = new ccui.Layout(cc.winSize);
            buttonLayout.setAnchorPoint(0.5, 0.5);
            buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
            buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
            buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            buttonLayout.setSizePercent(cc.p(0.65, 0.5));
            this.addChild(buttonLayout);

            // Creates three vertical layouts to divide the buttons
            for (var i = 0; i < 2; i++) {
                this.createVerticalLayout(buttonLayout, i, 2);
            }
        }
    }, {
        key: "createVerticalLayout",
        value: function createVerticalLayout(parent, index, divisions) {
            // Setting up properties of vertical layout
            var vertLayout = new ccui.VBox();
            vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setSizePercent(cc.p(1 / divisions, 1.0));
            vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setPositionPercent(cc.p(index / divisions, -1.0));

            //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            //vertLayout.setBackGroundColor(cc.color((255/divisions) * index + 50, 0, 0,255));

            vertLayout.addComponent(new FitToParent());
            parent.addChild(vertLayout);

            // Creates the three buttons to be attached to the vertical layout with functions to be binded
            switch (index) {
                case 0:
                    this.createButton(vertLayout, "PLAY", this.onClickPlay);
                    break;
                case 1:
                    this.createButton(vertLayout, "RULES", this.onClickRules);
                    break;
                default:
                    console.log("ERROR: Invalid Index");
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

    return TitleLandscapeLayout;
}(ccui.Layout);