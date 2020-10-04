class MainMenuLandscapeLayout extends ccui.Layout
{
    constructor()
    {
        super("MainMenuLandscapeLayout");
        this.scheduleUpdate();
    }

    onEnter()
    {
        super.onEnter();
        this.setContentSize(cc.winSize);

        // Title text
        this.addChild(new Text("Title",
            "Toiree",
            res.PixelFont.name,
            60,
            cc.p(0.5, 0.7),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));

        // Handles all menu button creation
        this.createRowOfButtons();

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
    }

    createRowOfButtons()
    {
        // Creates linear layout for vertical box layout positioning
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(1.0, 0.5));
        buttonLayout.setName("Buttons");
        this.addChild(buttonLayout);


        for (let i = 0; i < 3; i++)
        {
            // Creates three vertical layouts to divide the buttons
            let divisions = 3;
            // Setting up properties of vertical layout
            let vertLayout = new ccui.VBox();
            vertLayout.setName("Choices" + i);
            vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setSizePercent(cc.p(1 / divisions, 1.0));
            vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
            vertLayout.setPositionPercent(cc.p(i / divisions, -1.0));

            vertLayout.addComponent(new FitToParent());
            buttonLayout.addChild(vertLayout);

            // Binds specific properties to a button depending on index
            if (i === 0)
            {
                this.createButton(vertLayout, "PLAY", this.onClickPlay);

            }
            else if (i === 1)
            {
                this.createButton(vertLayout, "RULES", this.onClickRules);

            }
            else
            {
                this.createButton(vertLayout, "LEADERBOARD", this.onClickLeaderboard);
            }
        }
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        // Sets ups button with 9-slice
        let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300, 125));

        button.setTitleFontSize(40);
        button.setTitleFontName("Pixel");
        button.setTitleText(text);
        button.setName(text);

        if (!GameManager.getInstance().isNameSet)
        {
            button.setTouchEnabled(false);
        }

        let layoutParameter = new ccui.LinearLayoutParameter();
        layoutParameter.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, -70, 0, 0);
        button.setLayoutParameter(layoutParameter);

        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        parent.addChild(button);
    }

    // Goes to play scene
    onClickPlay()
    {
        console.log("play");
        GameManager.getInstance().resumeGame();
        GameManager.getInstance().score = 0;
        cc.director.runScene(new MainGameScene());
    }

    // Goes to rule scene
    onClickRules()
    {
        cc.director.runScene(new RulesScene());
    }

    //Go to leaderboard scene
    onClickLeaderboard()
    {
        cc.director.runScene(new LeaderboardScene());
    }

    // Creates pop-up quit confirmation menu
    onClickQuit()
    {
        console.log("quit");
    }
}

class MainMenuPortraitLayout extends PortraitLayout
{
    constructor()
    {
        super("MainMenuPortraitLayout");
    }

    onEnter()
    {
        super.onEnter();

        // Instantiates input name popup here if user is not created
        // Also here to render after everything else
        if (!GameManager.getInstance().isNameSet)
        {
            this.getParent().addChild(new InputNamePopupLayout(this));
        }

        this.createTitle();
        this.createColumnOfButtons();
    }

    // Creates title layout to be anchored to top of relative layout
    createTitle()
    {
        // Creates linear layout for text positioning
        let titleLayout = new ccui.Layout(cc.winSize);
        titleLayout.setAnchorPoint(0.5, 0.5);
        titleLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        titleLayout.setPositionPercent(cc.p(0.5, 0.7));
        titleLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        titleLayout.setSizePercent(cc.p(0.75, 0.3));
        titleLayout.addComponent(new FitToParent());

        // Sets up layout parameters
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        titleLayout.setLayoutParameter(layoutParameter);
        this.addChild(titleLayout);

        // Creates and childs title text to title layout
        titleLayout.addChild(new Text(
            "Title",
            "Toiree",
            res.PixelFont.name,
            60,
            cc.p(0.5, 0.7),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));
    }

    // Creates button layout to be anchored to bottom of relative layout
    createColumnOfButtons()
    {
        // Creates linear layout for vertical box layout positioning
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.70, 0.45));
        buttonLayout.addComponent(new FitToParent());
        buttonLayout.setName("Buttons");

        // Debug to see the rect bounds of the layout
        //buttonLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //buttonLayout.setBackGroundColor(cc.color(0, 150, 0, 255));

        // Sets up layout parameters
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
        // layoutParameter.setMargin(10, 0, 0, 0);
        buttonLayout.setLayoutParameter(layoutParameter);
        this.addChild(buttonLayout);

        // Creates a vertical layout to be childed to button layout
        this.createVerticalLayout(buttonLayout);
    }

    // Creates a vertical layout
    createVerticalLayout(parent)
    {
        // Setting up properties of vertical layout
        let vertLayout = new ccui.VBox();
        vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setSizePercent(cc.p(1.0, 1.0));
        vertLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        vertLayout.setPositionPercent(cc.p(0.0, 0.4));
        //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //vertLayout.setBackGroundColor(cc.color(150, 0, 0,255));
        vertLayout.addComponent(new FitToParent());
        vertLayout.setName("Choices");
        parent.addChild(vertLayout);

        // Creates the three buttons to be attached to the vertical layout with functions to be binded
        this.createButton(vertLayout, "PLAY", this.onClickPlay);
        this.createButton(vertLayout, "RULES", this.onClickRules);
        this.createButton(vertLayout, "LEADERBOARD", this.onClickLeaderboard);
        // this.createButton(vertLayout, "LEADERBOARD", this.onClickRules);
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        // Sets ups button with 9-slice
        let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);

        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300, 125));

        button.setTitleFontSize(40);
        button.setTitleFontName("Pixel");
        button.setTitleText(text);
        button.setName(text);

        if (!GameManager.getInstance().isNameSet)
        {
            button.setTouchEnabled(false);
        }

        let layoutParameter = new ccui.LinearLayoutParameter();
        layoutParameter.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, -10, 0, 0);
        button.setLayoutParameter(layoutParameter);

        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        parent.addChild(button);
    }

    // Goes to play scene
    onClickPlay()
    {
        console.log("play");
        GameManager.getInstance().resumeGame();
        GameManager.getInstance().score = 0;
        cc.director.runScene(new MainGameScene());
    }

    // Goes to rule scene
    onClickRules()
    {
        cc.director.runScene(new RulesScene());
    }

    //Go to leaderboard scene
    onClickLeaderboard()
    {
        cc.director.runScene(new LeaderboardScene());
    }

    // Creates pop-up quit confirmation menu
    onClickQuit()
    {
        console.log("quit");
    }
}