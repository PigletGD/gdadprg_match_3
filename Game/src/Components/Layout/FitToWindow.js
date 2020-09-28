class FitToWindow extends ResizeListener {
    constructor(){
        super();
        this.setName("Fit To Window");
    }

    onEnter(){
        cc.assert(this.getOwner() instanceof ccui.Layout, "Component compatible only with ccui.Layout");
        super.onEnter();
    }

    onResize(){
        this.getOwner().setContentSize(cc.winSize);
    }
}