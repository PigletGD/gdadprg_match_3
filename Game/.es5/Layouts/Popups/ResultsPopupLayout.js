"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsPopupLayout = function (_ccui$Layout) {
        _inherits(ResultsPopupLayout, _ccui$Layout);

        function ResultsPopupLayout() {
                _classCallCheck(this, ResultsPopupLayout);

                var _this = _possibleConstructorReturn(this, (ResultsPopupLayout.__proto__ || Object.getPrototypeOf(ResultsPopupLayout)).call(this));

                _this.setContentSize(cc.winSize);
                _this.scheduleUpdate();
                _this.addComponent(new FitToWindow());

                _this.createPopup();
                _this.createButtons();
                return _this;
        }

        _createClass(ResultsPopupLayout, [{
                key: "createPopup",
                value: function createPopup() {
                        this.addChild(new Popup());
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

                        // Start of score text setup
                        var score = GameManager.getInstance().score;
                        var scoreText = new ccui.Text("Score " + score.toString(), "Pixel", 48);
                        scoreText.setAnchorPoint(0.5, 0.5);
                        scoreText.addComponent(new FitToParent());

                        var textLayoutParameter = new ccui.RelativeLayoutParameter();
                        textLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
                        textLayoutParameter.setMargin(0, 10, 0, 0);
                        scoreText.setLayoutParameter(textLayoutParameter);

                        popUp.addChild(scoreText);

                        // End of pause text setup

                        // Start of resume button setup

                        var retryButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

                        retryButton.setScale9Enabled(true);
                        retryButton.setCapInsets(cc.rect(20, 20, 20, 20));
                        retryButton.setContentSize(cc.size(150, 65));
                        retryButton.setAnchorPoint(0.0, 0.0);
                        retryButton.setTitleFontSize(14);
                        retryButton.setTitleFontName("Pixel");
                        retryButton.setTitleText("RETRY");
                        retryButton.addComponent(new FitToParent());

                        var retryLayoutParameter = new ccui.RelativeLayoutParameter();
                        retryLayoutParameter.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
                        retryButton.setLayoutParameter(retryLayoutParameter);

                        retryButton.addClickEventListener(this.onClickRetry.bind(this));
                        popUp.addChild(retryButton);

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
                key: "onClickRetry",
                value: function onClickRetry() {
                        GameManager.getInstance().resumeGame();
                        GameManager.getInstance().score = 0;
                        cc.director.runScene(new MainGameScene());
                }
        }, {
                key: "onFinish",
                value: function onFinish() {
                        GameManager.getInstance().resumeGame();
                        this.getParent().removeChild(this);
                }
        }, {
                key: "onClickMainMenu",
                value: function onClickMainMenu() {
                        cc.director.runScene(new MainMenuScene());
                }
        }]);

        return ResultsPopupLayout;
}(ccui.Layout);