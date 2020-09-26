class TitlePortraitLayout extends ccui.RelativeBox{
    constructor(){
        super();
        this.setName("TitleLandscapeUI");
        this.scheduleUpdate();
    }

    onEnter(){
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnPortrait());

        this.createTitle();
        this.createColumnOfButtons();
    }

    // Creates text using pixel percentaging
    createTextPercent(parent, name, message, x, y, size){
        let text = new ccui.Text(message, "Pixel", size);
        text.setName(name);
        text.setPositionType(ccui.Widget.POSITION_PERCENT);
        text.setPositionPercent(cc.p(x, y));
        text.enableOutline(cc.color(0, 0, 0, 255), 4);
        parent.addChild(text);
        text.addComponent(new FitToParent());
    }

    // Creates title layout to be anchored to top of relative layout
    createTitle() {
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
        this.createTextPercent(titleLayout, "Title", "Title of Game", 0.5, 0.4, 60);
    }

    // Creates button layout to be anchored to bottom of relative layout
    createColumnOfButtons(){
        // Creates linear layout for vertical box layout positioning
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.70, 0.45));
        buttonLayout.addComponent(new FitToParent());
        
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
    createVerticalLayout(parent){
        // Setting up properties of vertical layout
        let vertLayout = new ccui.VBox();
        vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setSizePercent(cc.p(1.0, 1.0));
        vertLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        vertLayout.setPositionPercent(cc.p(0.0, 0.4));
        //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //vertLayout.setBackGroundColor(cc.color(150, 0, 0,255));
        vertLayout.addComponent(new FitToParent());
        parent.addChild(vertLayout);
        
        // Creates the three buttons to be attached to the vertical layout with functions to be binded
        this.createButton(vertLayout, "PLAY", this.onClickPlay);
        this.createButton(vertLayout, "RULES", this.onClickRules);
    }

    // Create a button
    createButton(parent, text, bindingFunction){
        // Sets ups button with 9-slice
        let button = new ccui.Button( res.Button9Slice_png, res.Button9SliceSelected_png);
        button.setName(text);
        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300,125));
        button.setTitleFontSize(48)
        button.setTitleFontName("Pixel")
        button.setTitleText(text)

        let layoutParameter = new ccui.LinearLayoutParameter();
        layoutParameter.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
        layoutParameter.setMargin(0, 0, 0, 0);
        button.setLayoutParameter(layoutParameter);

        button.addComponent(new FitToParent());

        // Binds function to the button for click event
        button.addClickEventListener(bindingFunction.bind(this));
        parent.addChild(button);
    }

    // Goes to play scene
    onClickPlay(){
        console.log("play");
        cc.director.runScene(new MainGameScene());
    }

    // Goes to rule scene
    onClickRules(){
        cc.director.runScene(new RulesScene());
    }

    // Creates pop-up quit confirmation menu
    onClickQuit(){
        console.log("quit");
    }
}