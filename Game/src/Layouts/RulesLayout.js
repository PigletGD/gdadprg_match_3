class RulesLandscapeLayout extends LandscapeLayout
{
    constructor()
    {
        super("RulesLandscapeLayout");
    }

    onEnter()
    {
        super.onEnter();
        this.createRulesText(this);
        this.createButton(this, "BACK", this.onClickBack);
    }

    createRulesText(parent)
    {
        // Creates bounding box of text for sizing
        let rulesLayout = new ccui.Layout(cc.winSize);
        rulesLayout.setAnchorPoint(0.5, 0.5);
        rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
        rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        rulesLayout.setSizePercent(cc.p(0.9, 0.8));
        rulesLayout.addComponent(new FitToParent());

        // Creates relative box to anchor children to specific point
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, 10, 0, 0);
        rulesLayout.setLayoutParameter(layoutParameter);
        parent.addChild(rulesLayout);

        // Rules text
        let rules = "RULES:\n\n1.) Click on two adjacent \ntiles to swap their places\n\n2.) Match three or more adjacent \nsame type tiles to earn points\n\n3.) Gain as much points as \npossible within two minutes";

        rulesLayout.addChild(new Text(
            "Rules",
            rules,
            res.PixelFont.name,
            48,
            cc.p(0.5, 0.5),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        // Layout for precise placement
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.25, 0.2));
        buttonLayout.addComponent(new FitToParent());
        
        // Layout for anchoring
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

    onClickBack()
    {
        cc.director.runScene(new MainMenuScene());
    }
}

class RulesPortraitLayout extends PortraitLayout
{
    constructor()
    {
        super("RulesPortraitLayout");
    }

    onEnter()
    {
        super.onEnter();

        this.createRulesText(this);
        this.createButton(this, "BACK", this.onClickBack);
    }

    createRulesText(parent)
    {
        // Creates bounding box of text for sizing
        let rulesLayout = new ccui.Layout(cc.winSize);
        rulesLayout.setAnchorPoint(0.5, 0.5);
        rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
        rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        rulesLayout.setSizePercent(cc.p(0.9, 0.8));
        rulesLayout.addComponent(new FitToParent());

        // Creates relative box to anchor children to specific point
        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, 10, 0, 0);
        rulesLayout.setLayoutParameter(layoutParameter);
        parent.addChild(rulesLayout);

        // Rules text
        let rules = "RULES:\n\n1.) Click on two\nadjacent tiles to\nswap their places\n\n2.) Match three or\nmore adjacent same\ntype tiles to earn\npoints\n\n3.) Gain as much\npoints as possible\nwithin two minutes";

        rulesLayout.addChild(new Text(
            "Rules",
            rules,
            res.PixelFont.name,
            48,
            cc.p(0.5, 0.5),
            {
                color: cc.color(0, 0, 0, 255),
                stroke: 4
            }));
    }

    // Create a button
    createButton(parent, text, bindingFunction)
    {
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.45, 0.2));
        buttonLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_BOTTOM_CENTER_HORIZONTAL);
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

    onClickBack()
    {
        cc.director.runScene(new MainMenuScene());
    }
}