"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PausePopupLayout = function (_ccui$Layout) {
        _inherits(PausePopupLayout, _ccui$Layout);

        function PausePopupLayout() {
                _classCallCheck(this, PausePopupLayout);

                var _this = _possibleConstructorReturn(this, (PausePopupLayout.__proto__ || Object.getPrototypeOf(PausePopupLayout)).call(this));

                _this.setContentSize(cc.winSize);
                _this.scheduleUpdate();
                _this.addComponent(new FitToWindow());

                _this.createPopup();
                _this.createButtons();
                return _this;
        }

        _createClass(PausePopupLayout, [{
                key: "createPopup",
                value: function createPopup() {
                        var popUp = new ccui.RelativeBox();
                        this.popUp = popUp;
                        popUp.setAnchorPoint(cc.p(0.5, 0.5));
                        popUp.setPositionType(ccui.Widget.POSITION_PERCENT);
                        popUp.setPositionPercent(cc.p(0.5, 0.5));
                        popUp.setSizeType(ccui.Widget.SIZE_PERCENT);
                        popUp.setSizePercent(cc.p(0.7, 0.7));

                        popUp.setBackGroundImageScale9Enabled(true);
                        popUp.setBackGroundImage(res.Button9Slice_png, ccui.Widget.LOCAL_TEXTURE);
                        var insetSize = 20;
                        popUp.setBackGroundImageCapInsets(cc.rect(insetSize, insetSize, insetSize, insetSize));

                        this.addChild(popUp);
                }
        }, {
                key: "createButtons",
                value: function createButtons() {
                        var popUp = this.popUp;

                        // Popup window animation
                        this.popUp.setScale(0.0);
                        var scaleTo = new cc.ScaleTo(0.2, 1.0);
                        scaleTo = new cc.EaseBackOut(scaleTo);
                        this.popUp.runAction(scaleTo);

                        // Start of pause text setup

                        var pauseText = new ccui.Text("PAUSED GAME", "Pixel", 60);
                        pauseText.setAnchorPoint(0.5, 0.5);
                        pauseText.addComponent(new FitToParent());

                        var textLayoutParameter = new ccui.RelativeLayoutParameter();
                        textLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
                        textLayoutParameter.setMargin(0, 10, 0, 0);
                        pauseText.setLayoutParameter(textLayoutParameter);

                        popUp.addChild(pauseText);

                        // End of pause text setup

                        // Start of resume button setup

                        var resumeButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

                        resumeButton.setScale9Enabled(true);
                        resumeButton.setCapInsets(cc.rect(20, 20, 20, 20));
                        resumeButton.setContentSize(cc.size(150, 65));
                        resumeButton.setAnchorPoint(0.0, 0.0);
                        resumeButton.setTitleFontSize(14);
                        resumeButton.setTitleFontName("Pixel");
                        resumeButton.setTitleText("RESUME");
                        resumeButton.addComponent(new FitToParent());

                        var resumeLayoutParameter = new ccui.RelativeLayoutParameter();
                        resumeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
                        resumeButton.setLayoutParameter(resumeLayoutParameter);

                        resumeButton.addClickEventListener(this.onClickResume.bind(this));
                        popUp.addChild(resumeButton);

                        // End of resume button setup

                        // Start of main menu button setup

                        var mainMenuButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

                        mainMenuButton.setScale9Enabled(true);
                        mainMenuButton.setCapInsets(cc.rect(20, 20, 20, 20));
                        mainMenuButton.setContentSize(cc.size(150, 65));
                        mainMenuButton.setTitleFontSize(14);
                        mainMenuButton.setTitleFontName("Pixel");
                        mainMenuButton.setTitleText("MAIN MENU");
                        mainMenuButton.addComponent(new FitToParent());

                        var layoutParameter = new ccui.RelativeLayoutParameter();
                        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
                        layoutParameter.setMargin(0, 0, 0, 10);
                        mainMenuButton.setLayoutParameter(layoutParameter);

                        mainMenuButton.addClickEventListener(this.onClickMainMenu.bind(this));
                        popUp.addChild(mainMenuButton);
                }
        }, {
                key: "onClickResume",
                value: function onClickResume() {
                        if (GameManager.getInstance().isPaused()) {
                                var scaleTo = new cc.ScaleTo(0.2, 0.0);
                                var callFunc = new cc.callFunc(this.onFinish, this);
                                scaleTo = new cc.EaseBackIn(scaleTo);
                                this.popUp.runAction(new cc.sequence(scaleTo, callFunc));
                        }
                }
        }, {
                key: "onFinish",
                value: function onFinish() {
                        // Unpause Game Here

                        GameManager.getInstance().resumeGame();

                        var parent = this.getParent();
                        parent.getChildByName("MainGameLandscapeLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);
                        parent.getChildByName("MainGamePortraitLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);

                        parent.removeChild(this);
                }
        }, {
                key: "onClickMainMenu",
                value: function onClickMainMenu() {
                        cc.director.runScene(new MainMenuScene());
                }
        }]);

        return PausePopupLayout;
}(ccui.Layout);