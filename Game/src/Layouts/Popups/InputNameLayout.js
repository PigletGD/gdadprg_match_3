class InputNamePopupLayout extends ccui.Layout
{
	constructor(loadedFrom)
	{
		super();
		this.origin = loadedFrom;

		this.setContentSize(cc.winSize);
		this.scheduleUpdate();
		this.addComponent(new FitToWindow());

		this.createPopup();
		this.createButtons();

	}

	createPopup()
	{
		this.popUp = new Popup();
		this.addChild(this.popUp);
		this.popUp.playEntranceAnimation();
	}

	createButtons()
	{
		let popUp = this.popUp;

		// Input prompt setup
		let inputNamePrompt = new Text2("InputNamePrompt");
		inputNamePrompt.setFontName(res.PixelFont.name);
		inputNamePrompt.setString("What is your name?");
		inputNamePrompt.setFontSize(45); // TODO: Make an auto-size feature
		inputNamePrompt.setAnchorPoint(0.5, 0.5);

		let promptLayoutParameter = new ccui.RelativeLayoutParameter();
		promptLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
		promptLayoutParameter.setMargin(0, 50, 0, 0);

		inputNamePrompt.setLayoutParameter(promptLayoutParameter);

		popUp.addUIElement(inputNamePrompt);

		// Text field setup

		let textField = new ccui.TextField();
		textField.setTouchEnabled(true);
		textField.setFontName(res.PixelFont.name);
		textField.setPlaceHolder("Input your name");
		textField.setPlaceHolderColor(cc.color(200, 200, 200, 255));
		textField.setFontSize(30);
		textField.setAnchorPoint(0.5, 0.5);
		textField.setString("");
		textField.setMaxLengthEnabled(true);
		textField.setMaxLength(12);

		textField.addEventListener(this.onTextFieldUpdate, this);
		textField.setPositionType(ccui.Widget.POSITION_PERCENT);
		textField.setPositionPercent(cc.p(0.5, 0.5));

		let textLayoutParameter2 = new ccui.RelativeLayoutParameter();
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

		let resumeLayoutParameter = new ccui.RelativeLayoutParameter();
		resumeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
		resumeLayoutParameter.setMargin(0, 0, 0, 50);

		this.acceptButton.setLayoutParameter(resumeLayoutParameter);

		this.acceptButton.addClickEventListener(this.onClickAccept.bind(this));

		popUp.addUIElement(this.acceptButton);
	}

	onTextFieldUpdate(sender, type)
	{
		switch (type)
		{
			case ccui.TextField.EVENT_DETACH_WITH_IME:
				{
					let text = sender.getString();
					if (text !== "")
					{
						this.acceptButton.setTouchEnabled(true);
						console.log(text);
						this.inputtedName = text;
					}
					else
					{
						this.acceptButton.setTouchEnabled(false);
					}
				} break;

		}
	}
	onClickAccept()
	{
		console.log("accepted " + this.inputtedName);
		UserService.getInstance().createUser(this.inputtedName, 0);
		GameManager.getInstance().nameHasSet();
		this.popUp.playExitAnimation(this, this.onFinish);
	}
	onFinish()
	{
		// Unpause Game Here
		GameManager.getInstance().resumeGame();
		// Enable button interaction
		this.origin.getParent().getChildByName("MainMenuLandscapeLayout").getChildByName("Buttons").getChildByName("Choices0").getChildByName("PLAY").setTouchEnabled(true);
		this.origin.getParent().getChildByName("MainMenuLandscapeLayout").getChildByName("Buttons").getChildByName("Choices1").getChildByName("RULES").setTouchEnabled(true);
		this.origin.getParent().getChildByName("MainMenuLandscapeLayout").getChildByName("Buttons").getChildByName("Choices2").getChildByName("LEADERBOARD").setTouchEnabled(true);
		this.origin.getParent().getChildByName("MainMenuPortraitLayout").getChildByName("Buttons").getChildByName("Choices").getChildByName("PLAY").setTouchEnabled(true);
		this.origin.getParent().getChildByName("MainMenuPortraitLayout").getChildByName("Buttons").getChildByName("Choices").getChildByName("RULES").setTouchEnabled(true);
		this.origin.getParent().getChildByName("MainMenuPortraitLayout").getChildByName("Buttons").getChildByName("Choices").getChildByName("LEADERBOARD").setTouchEnabled(true);
		this.origin.removeChild(this);
	}
}