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
        let popUp = new ccui.RelativeBox();
        this.popUp = popUp;
        popUp.setAnchorPoint(cc.p(0.5, 0.5));
        popUp.setPositionType(ccui.Widget.POSITION_PERCENT);
        popUp.setPositionPercent(cc.p(0.5, 0.5));
        popUp.setSizeType(ccui.Widget.SIZE_PERCENT);
        popUp.setSizePercent(cc.p(0.7, 0.7));

        popUp.setBackGroundImageScale9Enabled(true);
        popUp.setBackGroundImage(res.Button9Slice_png, ccui.Widget.LOCAL_TEXTURE);
        let insetSize = 20;
        popUp.setBackGroundImageCapInsets(cc.rect(insetSize, insetSize, insetSize, insetSize));

        this.addChild(popUp);
    }

    createButtons()
    {
        let popUp = this.popUp;

        // Popup window animation
        this.popUp.setScale(0.0);
        let scaleTo = new cc.ScaleTo(0.2, 1.0);
        scaleTo = new cc.EaseBackOut(scaleTo);
        this.popUp.runAction(scaleTo);

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
        retryButton.setContentSize(cc.size(100, 50));
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
        mainMenuButton.setContentSize(cc.size(100, 50));
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
        GameManager.getInstance().resumeGame();
        cc.director.runScene(new MainGameScene());
    }
    onFinish()
    {
        GameManager.getInstance().resumeGame();
        this.getParent().removeChild(this);
    }
    onClickMainMenu()
    {
        cc.director.runScene(new MainMenuScene());
    }
}