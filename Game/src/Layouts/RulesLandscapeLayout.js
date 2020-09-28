class RulesLandscapeLayout extends ccui.RelativeBox{
    constructor(){
        super();
        this.setName("RulesLandscapeLayout");
        this.scheduleUpdate();
    }

    onEnter(){
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.createRulesText(this);
        this.createButton(this, "BACK", this.onClickBack);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
    }

    createTextPercent(parent, name, message, x, y, size){
        let text = new ccui.Text(message, "Pixel", size);
        text.setName(name);
        text.setPositionType(ccui.Widget.POSITION_PERCENT);
        text.setPositionPercent(cc.p(x, y));
        text.enableOutline(cc.color(0, 0, 0, 255), 4);
        parent.addChild(text);
        text.addComponent(new FitToParent());
    }

    createRulesText(parent) {
        let rulesLayout = new ccui.Layout(cc.winSize);
        rulesLayout.setAnchorPoint(0.5, 0.5);
        rulesLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        rulesLayout.setPositionPercent(cc.p(0.5, 0.7));
        rulesLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        rulesLayout.setSizePercent(cc.p(0.9, 0.8));
        //rulesLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //rulesLayout.setBackGroundColor(cc.color(0, 150, 0, 255));
        rulesLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, 10, 0, 0);
        rulesLayout.setLayoutParameter(layoutParameter);
        parent.addChild(rulesLayout);

        let rules = "RULES:\n\n1.) Click on two adjacent \ntiles to swap their places\n\n2.) Match three or more adjacent \nsame type tiles to earn points\n\n3.) Gain as much points as \npossible within two minutes";
        this.createTextPercent(rulesLayout, "RulesText", rules, 0.5, 0.5, 48);
    }

    // Create a button
    createButton(parent, text, bindingFunction){
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.25, 0.2));
        //buttonLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //buttonLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
        buttonLayout.addComponent(new FitToParent());

        let layoutParameter = new ccui.RelativeLayoutParameter();
        layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
        layoutParameter.setMargin(0, 0, 0, 0);
        buttonLayout.setLayoutParameter(layoutParameter);
        parent.addChild(buttonLayout);

        // Sets ups button with 9-slice
        let button = new ccui.Button( res.Button9Slice_png, res.Button9SliceSelected_png);
        button.setName(text);
        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300, 125));
        button.setTitleFontSize(60);
        button.setTitleFontName("Pixel")
        button.setTitleText(text);
        button.setPositionType(ccui.Widget.POSITION_PERCENT);
        button.setPositionPercent(cc.p(0.5, 0.5));
        //button.setAnchorPoint(cc.p(1.0, 1.0));
        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        buttonLayout.addChild(button);
    }

    onClickBack(){
        cc.director.runScene(new MainMenuScene());
    }
}