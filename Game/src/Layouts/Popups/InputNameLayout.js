class InputNamePopupLayout extends ccui.Layout
{
	constructor()
	{
		super();
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
		inputNamePrompt.setFontSize(32); // TODO: Make an auto-size feature
		inputNamePrompt.setAnchorPoint(0.5, 0.5);

		let promptLayoutParameter = new ccui.RelativeLayoutParameter();
		promptLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
		promptLayoutParameter.setMargin(0, 30, 0, 0);

		inputNamePrompt.setLayoutParameter(promptLayoutParameter);

		popUp.addUIElement(inputNamePrompt);

		// Text field setup

		let textField = new ccui.TextField();
		textField.setTouchEnabled(true);
		textField.setFontName(res.PixelFont.name);
		textField.setPlaceHolder("Input your name");
		textField.setPlaceHolderColor("#ffffff");
		textField.setFontSize(28);
		textField.setAnchorPoint(0.5, 0.5);
		textField.setString("Input your name");
		textField.setMaxLengthEnabled(true);
		textField.setMaxLength(18);

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
		resumeLayoutParameter.setMargin(0, 0, 0, 30);

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
					if (text !== "Input your name")
					{
						this.acceptButton.setTouchEnabled(true);
					}
				} break;
		}
	}
	onClickAccept()
	{
		GameManager.getInstance().nameHasSet();

		// Send data
		this.popUp.playExitAnimation(this, this.onFinish);
	}
	onFinish()
	{
		// Unpause Game Here
		GameManager.getInstance().resumeGame();
		// Disable button interaction

		let parent = this.getParent();
		// parent.getChildByName("MainGameLandscapeLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);
		// parent.getChildByName("MainGamePortraitLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);

		parent.removeChild(this);
	}
}