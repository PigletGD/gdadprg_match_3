class PausePopupLayout extends ccui.Layout
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

        // Start of pause text setup
        let pauseText = new ccui.Text("PAUSED GAME", "Pixel", 60);
        pauseText.setAnchorPoint(0.5, 0.5);
        pauseText.addComponent(new FitToParent());

        let textLayoutParameter = new ccui.RelativeLayoutParameter();
        textLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        textLayoutParameter.setMargin(0, 10, 0, 0);
        pauseText.setLayoutParameter(textLayoutParameter);

        popUp.addUIElement(pauseText);

        // Start of resume button setup
        let resumeButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

        resumeButton.setScale9Enabled(true);
        resumeButton.setCapInsets(cc.rect(20, 20, 20, 20));
        resumeButton.setContentSize(cc.size(150, 65));
        resumeButton.setAnchorPoint(0.0, 0.0);
        resumeButton.setTitleFontSize(14);
        resumeButton.setTitleFontName("Pixel");
        resumeButton.setTitleText("RESUME");
        resumeButton.addComponent(new FitToParent());

        let resumeLayoutParameter = new ccui.RelativeLayoutParameter();
        resumeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
        resumeButton.setLayoutParameter(resumeLayoutParameter);

        resumeButton.addClickEventListener(this.onClickResume.bind(this));

        popUp.addUIElement(resumeButton);

        // Start of main menu button setup
        let mainMenuButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

        mainMenuButton.setScale9Enabled(true);
        mainMenuButton.setCapInsets(cc.rect(20, 20, 20, 20));
        mainMenuButton.setContentSize(cc.size(150, 65));
        mainMenuButton.setTitleFontSize(14);
        mainMenuButton.setTitleFontName("Pixel");
        mainMenuButton.setTitleText("MAIN MENU");
        mainMenuButton.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, 0, 0, 10);
        mainMenuButton.setLayoutParameter(layoutParameter);

        mainMenuButton.addClickEventListener(this.onClickMainMenu.bind(this));
        popUp.addUIElement(mainMenuButton);
    }
    onClickResume()
    {
        if (GameManager.getInstance().isPaused())
        {
            this.popUp.playExitAnimation(this, this.onFinish);
        }
    }

    onFinish()
    {
        // Unpause Game Here
        GameManager.getInstance().resumeGame();

        let parent = this.getParent();
        parent.getChildByName("MainGameLandscapeLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);
        parent.getChildByName("MainGamePortraitLayout").getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(true);

        parent.removeChild(this);
    }
    
    onClickMainMenu()
    {
        this.popUp.playExitAnimation(this, this.goToMainMenu);
    }

    goToMainMenu()
    {
        cc.director.runScene(new MainMenuScene());
    }
}