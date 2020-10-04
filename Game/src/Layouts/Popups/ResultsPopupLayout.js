class ResultsPopupLayout extends ccui.Layout
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

        // Start of score text setup
        let score = GameManager.getInstance().score;
        let scoreText = new ccui.Text("Score " + score.toString(), "Pixel", 48);
        scoreText.setAnchorPoint(0.5, 0.5);
        scoreText.addComponent(new FitToParent());

        let textLayoutParameter = new ccui.RelativeLayoutParameter();
        textLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        textLayoutParameter.setMargin(0, 10, 0, 0);
        scoreText.setLayoutParameter(textLayoutParameter);

        popUp.addChild(scoreText);

        // End of pause text setup

        // Start of resume button setup

        let retryButton = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

        retryButton.setScale9Enabled(true);
        retryButton.setCapInsets(cc.rect(20, 20, 20, 20));
        retryButton.setContentSize(cc.size(150, 65));
        retryButton.setAnchorPoint(0.0, 0.0);
        retryButton.setTitleFontSize(14);
        retryButton.setTitleFontName("Pixel");
        retryButton.setTitleText("RETRY");
        retryButton.addComponent(new FitToParent());

        let retryLayoutParameter = new ccui.RelativeLayoutParameter();
        retryLayoutParameter.setAlign(ccui.RelativeLayoutParameter.CENTER_IN_PARENT);
        retryButton.setLayoutParameter(retryLayoutParameter);

        retryButton.addClickEventListener(this.onClickRetry.bind(this));
        popUp.addChild(retryButton);

        // End of resume button setup

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
        popUp.addChild(mainMenuButton);
    }

    onClickRetry()
    {
        this.popUp.playExitAnimation(this, this.retryGame);
    }

    retryGame()
    {
        GameManager.getInstance().resumeGame();
        GameManager.getInstance().score = 0;
        cc.director.runScene(new MainGameScene());
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