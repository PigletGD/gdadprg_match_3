class MainGamePortraitLayout extends ccui.RelativeBox {
    constructor(){
        super();
        this.setName("MainGameLandscapeLayout");
        this.scheduleUpdate();
        this.timeText;
        this.scoreText;
    }

    onEnter(){
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.createStatsText(this);
        this.createButton(this, "PAUSE", this.onClickPause);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnPortrait());
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

    createStatsText(parent) {
        // let statsLayout = new ccui.Layout(cc.winSize);
        // statsLayout.setAnchorPoint(0.0, 0.0);
        // statsLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        // statsLayout.setSizePercent(cc.p(0.2, 0.5));
        // //statsLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // //statsLayout.setBackGroundColor(cc.color(0, 0, 150, 255));
        // statsLayout.addComponent(new FitToParent());

        // let layoutParameter = new ccui.RelativeLayoutParameter();
        // layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_CENTER_VERTICAL);
        // layoutParameter.setMargin(0, 0, 0, 0);
        // statsLayout.setLayoutParameter(layoutParameter);
        // parent.addChild(statsLayout);

        // let uiContainer = new ccui.ImageView();
        // uiContainer.loadTexture(res.TPHoloder_png);
        // uiContainer.addComponent(new FitToParent());
        // uiContainer.setAnchorPoint(0.05, -0.45);
        // statsLayout.addChild(uiContainer);

        // let vertLayout = new ccui.VBox();
        // vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        // vertLayout.setSizePercent(cc.p(0.7, 0.7));
        // uiContainer.addChild(vertLayout);

        this.timeText = new ccui.Text("Time", "Pixel", 36);
        this.timeText.setName("Time");
        this.timeText.enableOutline(cc.color(0, 0, 0, 255), 2);
        let timeLayoutParameter = new ccui.RelativeLayoutParameter();
        timeLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
        timeLayoutParameter.setMargin(20, 0, 0, 0);
        this.timeText.setLayoutParameter(timeLayoutParameter);
        parent.addChild(this.timeText);

        this.scoreText = new ccui.Text("Score", "Pixel", 36);
        this.scoreText.setName("Score");
        this.scoreText.enableOutline(cc.color(0, 0, 0, 255), 2);
        let scoreLayoutParameter = new ccui.RelativeLayoutParameter();
        scoreLayoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_RIGHT);
        scoreLayoutParameter.setMargin(0, 0, 20, 0);
        this.scoreText.setLayoutParameter(scoreLayoutParameter);
        parent.addChild(this.scoreText);
    }

    // Create a button
    createButton(parent, text, bindingFunction){
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.7));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.20, 0.15));
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

    onClickPause(){
        this.getParent().addChild(new ResultsPopupLayout());
    }
}