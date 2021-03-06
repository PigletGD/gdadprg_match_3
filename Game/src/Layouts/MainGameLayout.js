class MainGameLandscapeLayout extends ccui.RelativeBox
{
    constructor()
    {
        super();
        this.setName("MainGameLandscapeLayout");
        this.scheduleUpdate();
        this.timeText;
        this.scoreText;
    }

    onEnter()
    {
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.createStatsText(this);
        this.createButton(this, "PAUSE", this.onClickPause);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
    }

    createStatsText(parent)
    {
        let statsLayout = new ccui.Layout(cc.winSize);
        statsLayout.setAnchorPoint(0.0, 0.0);
        statsLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        statsLayout.setSizePercent(cc.p(0.2, 0.5));
        statsLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_CENTER_VERTICAL);
        layoutParameter.setMargin(0, 0, 0, 0);
        statsLayout.setLayoutParameter(layoutParameter);
        parent.addChild(statsLayout);

        let uiContainer = new ccui.ImageView();
        uiContainer.loadTexture(res.TPHoloder_png);
        uiContainer.addComponent(new FitToParent());
        uiContainer.setAnchorPoint(0.05, -0.45);
        statsLayout.addChild(uiContainer);

        let vertLayout = new ccui.VBox();
        vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setSizePercent(cc.p(0.7, 0.7));
        uiContainer.addChild(vertLayout);

        this.timeText = new Text(
            "Time",
            "Time",
            res.PixelFont.name,
            80,
            cc.p(0.5, 0.7),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 8
            });

        this.timeText.setName("Time");
        this.timeText.setAnchorPoint(0.0, 0.0);

        let timeLayoutParameter = new ccui.LinearLayoutParameter();
        timeLayoutParameter.setGravity(ccui.LinearLayoutParameter.LEFT);
        timeLayoutParameter.setMargin(100, 20, 0, 0);
        this.timeText.setLayoutParameter(timeLayoutParameter);
        vertLayout.addChild(this.timeText);

        this.scoreText = new Text(
            "Score",
            "Score",
            res.PixelFont.name,
            80,
            cc.p(0.5, 0.7),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 8
            });

        this.scoreText.setAnchorPoint(0.0, 0.0);

        let scoreLayoutParameter = new ccui.LinearLayoutParameter();
        scoreLayoutParameter.setGravity(ccui.LinearLayoutParameter.LEFT);
        scoreLayoutParameter.setMargin(100, 20, 0, 0);
        this.scoreText.setLayoutParameter(scoreLayoutParameter);
        vertLayout.addChild(this.scoreText);
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setName("Button Layout");
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.20, 0.15));
        buttonLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
        layoutParameter.setMargin(0, 0, 0, 0);
        buttonLayout.setLayoutParameter(layoutParameter);
        parent.addChild(buttonLayout);

        // Sets ups button with 9-slice
        let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
        button.setName(text);
        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300, 125));
        button.setTitleFontSize(60);
        button.setTitleFontName("Pixel");
        button.setTitleText(text);
        button.setPositionType(ccui.Widget.POSITION_PERCENT);
        button.setPositionPercent(cc.p(0.5, 0.5));
        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        buttonLayout.addChild(button);
    }

    onClickPause()
    {
        if (!GameManager.getInstance().isPaused())
        {
            this.getParent().addChild(new PausePopupLayout());
            GameManager.getInstance().pauseGame();
            this.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
        }
        console.log(GameManager.getInstance().isPaused());
    }

    update(timestep)
    {
        super.update(timestep);
        this.updateTimeText();
        this.updateScoreText();
    }

    updateTimeText()
    {
        let timeRemaining = this.getParent().getChildByName("TimerEntity").remainingSeconds;
        timeRemaining = Math.floor(timeRemaining);
        if (timeRemaining < 0)
        {
            timeRemaining = 0;
        }
        this.timeText.setString("Time: " + timeRemaining.toString());
    }

    updateScoreText()
    {
        let score = GameManager.getInstance().score;
        this.scoreText.setString("Score: " + score.toString());
    }
}

class MainGamePortraitLayout extends ccui.RelativeBox
{
    constructor()
    {
        super();
        this.setName("MainGamePortraitLayout");
        this.scheduleUpdate();
        this.timeText;
        this.scoreText;
    }

    onEnter()
    {
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.createStatsText(this);
        this.createButton(this, "PAUSE", this.onClickPause);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnPortrait());
    }

    createStatsText(parent)
    {
        this.timeText = new Text(
            "Time",
            "Time",
            res.PixelFont.name,
            24,
            cc.p(0.0, 0.0),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 2
            });

        this.timeText.setAnchorPoint(0.0, 0.0);
        let timeLayoutParameter = new ccui.RelativeLayoutParameter();
        timeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
        timeLayoutParameter.setMargin(20, 0, 0, 0);
        this.timeText.setLayoutParameter(timeLayoutParameter);
        parent.addChild(this.timeText);

        this.scoreText = new Text(
            "Score",
            "Score",
            res.PixelFont.name,
            24,
            cc.p(0.0, 0.0),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 2
            });

        let scoreLayoutParameter = new ccui.RelativeLayoutParameter();
        scoreLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_RIGHT);
        scoreLayoutParameter.setMargin(0, 0, 20, 0);
        this.scoreText.setLayoutParameter(scoreLayoutParameter);
        parent.addChild(this.scoreText);
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setName("Button Layout");
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.20, 0.15));
        buttonLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
        layoutParameter.setMargin(0, 0, 0, 0);
        buttonLayout.setLayoutParameter(layoutParameter);
        parent.addChild(buttonLayout);

        // Sets ups button with 9-slice
        let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
        button.setName(text);
        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300, 125));
        button.setTitleFontSize(60);
        button.setTitleFontName("Pixel");
        button.setTitleText(text);
        button.setPositionType(ccui.Widget.POSITION_PERCENT);
        button.setPositionPercent(cc.p(0.5, 0.5));
        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        buttonLayout.addChild(button);
    }

    onClickPause()
    {
        if (!GameManager.getInstance().isPaused())
        {
            this.getParent().addChild(new PausePopupLayout());
            GameManager.getInstance().pauseGame();
            this.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
        }
        console.log(GameManager.getInstance().isPaused());
    }

    update(timestep)
    {
        super.update(timestep);
        this.updateTimeText();
        this.updateScoreText();
    }

    updateTimeText()
    {
        let timeRemaining = this.getParent().getChildByName("TimerEntity").remainingSeconds;
        timeRemaining = Math.floor(timeRemaining);
        if (timeRemaining < 0)
        {
            timeRemaining = 0;
        }
        this.timeText.setString("Time: " + timeRemaining.toString());
    }

    updateScoreText()
    {
        let score = GameManager.getInstance().score;
        this.scoreText.setString("Score: " + score.toString());
    }
}