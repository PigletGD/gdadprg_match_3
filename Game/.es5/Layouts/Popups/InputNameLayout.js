"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputNamePopupLayout = function (_ccui$Layout) {
		_inherits(InputNamePopupLayout, _ccui$Layout);

		function InputNamePopupLayout(loadedFrom) {
				_classCallCheck(this, InputNamePopupLayout);

				var _this = _possibleConstructorReturn(this, (InputNamePopupLayout.__proto__ || Object.getPrototypeOf(InputNamePopupLayout)).call(this));

				_this.origin = loadedFrom;

				_this.setContentSize(cc.winSize);
				_this.scheduleUpdate();
				_this.addComponent(new FitToWindow());

				_this.createPopup();
				_this.createButtons();

				return _this;
		}

		_createClass(InputNamePopupLayout, [{
				key: "createPopup",
				value: function createPopup() {
						this.popUp = new Popup();
						this.addChild(this.popUp);
						this.popUp.playEntranceAnimation();
				}
		}, {
				key: "createButtons",
				value: function createButtons() {
						var popUp = this.popUp;

						// Input prompt setup
						var inputNamePrompt = new Text2("InputNamePrompt");
						inputNamePrompt.setFontName(res.PixelFont.name);
						inputNamePrompt.setString("What is your name?");
						inputNamePrompt.setFontSize(45); // TODO: Make an auto-size feature
						inputNamePrompt.setAnchorPoint(0.5, 0.5);

						var promptLayoutParameter = new ccui.RelativeLayoutParameter();
						promptLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
						promptLayoutParameter.setMargin(0, 50, 0, 0);

						inputNamePrompt.setLayoutParameter(promptLayoutParameter);

						popUp.addUIElement(inputNamePrompt);

						// Text field setup

						var textField = new ccui.TextField();
						textField.setTouchEnabled(true);
						textField.setFontName(res.PixelFont.name);
						textField.setPlaceHolder("Input your name");
						textField.setPlaceHolderColor(cc.color(200, 200, 200, 255));
						textField.setFontSize(30);
						textField.setAnchorPoint(0.5, 0.5);
						textField.setString("");

						textField.addEventListener(this.onTextFieldUpdate, this);
						textField.setPositionType(ccui.Widget.POSITION_PERCENT);
						textField.setPositionPercent(cc.p(0.5, 0.5));

						var textLayoutParameter2 = new ccui.RelativeLayoutParameter();
						textLayoutParameter2.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
						textLayoutParameter2.setMargin(0, 0, 0, 0);

						textField.setLayoutParameter(textLayoutParameter2);

						textField.addComponent(new FitToParent());

						popUp.addUIElement(textField);

						// Accept button setup
						this.acceptButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

						this.acceptButton.setScale9Enabled(true);
						this.acceptButton.setCapInsets(cc.rect(20, 20, 20, 20));
						this.acceptButton.setContentSize(cc.size(120, 60));
						this.acceptButton.setAnchorPoint(0.0, 0.0);
						this.acceptButton.setTitleFontSize(18);
						this.acceptButton.setTitleFontName(res.PixelFont.name);
						this.acceptButton.setTitleText("Accept");
						this.acceptButton.setTouchEnabled(false);

						this.acceptButton.addComponent(new FitToParent());

						var resumeLayoutParameter = new ccui.RelativeLayoutParameter();
						resumeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
						resumeLayoutParameter.setMargin(0, 0, 0, 50);

						this.acceptButton.setLayoutParameter(resumeLayoutParameter);

						this.acceptButton.addClickEventListener(this.onClickAccept.bind(this));

						popUp.addUIElement(this.acceptButton);
				}
		}, {
				key: "onTextFieldUpdate",
				value: function onTextFieldUpdate(sender, type) {
						switch (type) {
								case ccui.TextField.EVENT_DETACH_WITH_IME:
										{
												var text = sender.getString();
												if (text !== "") {
														this.acceptButton.setTouchEnabled(true);
														console.log(text);
														this.inputtedName = text;
												} else {
														this.acceptButton.setTouchEnabled(false);
												}
										}break;

						}
				}
		}, {
				key: "onClickAccept",
				value: function onClickAccept() {
						console.log("accepted " + this.inputtedName);
						UserService.getInstance().createUser(this.inputtedName, 0);
						GameManager.getInstance().nameHasSet();
						this.popUp.playExitAnimation(this, this.onFinish);
				}
		}, {
				key: "onFinish",
				value: function onFinish() {
						// Unpause Game Here
						GameManager.getInstance().resumeGame();
						// Disable button interaction
						this.origin.getChildByName("Buttons").getChildByName("Choices0").getChildByName("PLAY").setTouchEnabled(true);
						this.origin.getChildByName("Buttons").getChildByName("Choices1").getChildByName("RULES").setTouchEnabled(true);
						this.origin.getChildByName("Buttons").getChildByName("Choices2").getChildByName("LEADERBOARD").setTouchEnabled(true);
						this.origin.removeChild(this);
				}
		}]);

		return InputNamePopupLayout;
}(ccui.Layout);