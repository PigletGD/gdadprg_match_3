class TitleLandscapeLayout extends ccui.Layout{
    constructor(){
        super();
        this.setName("TitleLandscapeUI");
        this.scheduleUpdate();
    }

    onEnter(){
        super.onEnter();
        this.setContentSize(cc.winSize);
        
        this.createTextPercent(this, "Title", "Title of Game", 0.5, 0.7, 60);
        this.createRowOfButtons();
        
        let fitToWindow = new FitToWindow();
        fitToWindow.setName("FitToWindow")

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
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

    createRowOfButtons(){
        // Creates linear layout for vertical box layout positioning
        let buttonLayout = new ccui.Layout(cc.winSize);
        buttonLayout.setAnchorPoint(0.5, 0.5);
        buttonLayout.setPositionType(ccui.Widget.POSITION_PERCENT);
        buttonLayout.setPositionPercent(cc.p(0.5, 0.5));
        buttonLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        buttonLayout.setSizePercent(cc.p(0.65, 0.5));
        this.addChild(buttonLayout);

        // Creates three vertical layouts to divide the buttons
        for(let i = 0; i < 3; i++){
            this.createVerticalLayout(buttonLayout, i, 3);
        }
    }

    createVerticalLayout(parent, index, divisions){
        // Setting up properties of vertical layout
        let vertLayout = new ccui.VBox();
        vertLayout.setSizeType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setSizePercent(cc.p(1/divisions, 1.0));
        vertLayout.setPositionType(ccui.Widget.SIZE_PERCENT);
        vertLayout.setPositionPercent(cc.p(index/divisions, -1.0));
        
        //vertLayout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        //vertLayout.setBackGroundColor(cc.color((255/divisions) * index + 50, 0, 0,255));
        
        vertLayout.addComponent(new FitToParent());
        parent.addChild(vertLayout);
        
        // Creates the three buttons to be attached to the vertical layout with functions to be binded
        switch (index) {
            case 0:
                this.createButton(vertLayout, "PLAY", this.onClickPlay);
                break;
            case 1:
                this.createButton(vertLayout, "RULES", this.onClickRules);
                break;
            case 2:
                this.createButton(vertLayout, "QUIT", this.onClickQuit);
                break;
            default:
                console.log("ERROR: Invalid Index");
        }
            
    }

    // Create a button
    createButton(parent, text, bindingFunction){
        // Sets ups button with 9-slice
        let button = new ccui.Button( res.Button9Slice_png, res.Button9SliceSelected_png);

        button.setScale9Enabled(true);
        button.setCapInsets(cc.rect(20, 20, 20, 20));
        button.setContentSize(cc.size(300,125));

        button.setTitleFontSize(48)
        button.setTitleFontName("Pixel")
        button.setTitleText(text)

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
    onClickPlay(){
        console.log("play");
        cc.director.runScene(new PrototypeScene());
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