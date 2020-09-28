class TitleLandscapeLayout extends ccui.Layout
{
    constructor()
    {
        super();
        this.setName("TitleLandscapeUI");
        this.scheduleUpdate();
    }

    onEnter()
    {
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.addChild(new Text("Title",
            "Toiree",
            res.PixelFont.name,
            60,
            cc.p(0.5, 0.7),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));

        this.createRowOfButtons();

        let fitToWindow = new FitToWindow();
        fitToWindow.setName("FitToWindow");

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
        buttonLayout.setSizePercent(cc.p(0.65, 0.5));
        this.addChild(buttonLayout);

        // Creates three vertical layouts to divide the buttons
        for (let i = 0; i < 2; i++)
        {
            this.createVerticalLayout(buttonLayout, i, 2);
        }
    }

    createVerticalLayout(parent, index, divisions)
    {
        // Setting up properties of vertical layout
        let vertLayout = new ccui.VBox();
        vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setSizePercent(cc.p(1 / divisions, 1.0));
        vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setPositionPercent(cc.p(index / divisions, -1.0));

        //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //vertLayout.setBackGroundColor(cc.color((255/divisions) * index + 50, 0, 0,255));

        vertLayout.addComponent(new FitToParent());
        parent.addChild(vertLayout);

        // Creates the three buttons to be attached to the vertical layout with functions to be binded
        switch (index)
        {
            case 0:
                this.createButton(vertLayout, "PLAY", this.onClickPlay);
                break;
            case 1:
                this.createButton(vertLayout, "RULES", this.onClickRules);
                break;
            default:
                console.log("ERROR: Invalid Index");
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

        button.setTitleFontSize(48);
        button.setTitleFontName("Pixel");
        button.setTitleText(text);

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
        cc.director.runScene(new MainGameScene());
    }

    // Goes to rule scene
    onClickRules()
    {
        cc.director.runScene(new RulesScene());
    }

    // Creates pop-up quit confirmation menu
    onClickQuit()
    {
        console.log("quit");
    }
}