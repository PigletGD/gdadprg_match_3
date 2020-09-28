class GameLayerResizerAnchorLeft extends ResizeListener{
    constructor(padding){
        super();
        this.padding = padding;
        this.setName("GameLayerResizerAnchorLeft");
    }

    onEnter(){
        super.onEnter();
        this.onResize();
    }
    
    onResize(){
        let owner = this.getOwner();
        let ownerSize = owner.getContentSize();

        //owner.x = cc.winSize.width/2 - owner.width/2;
        owner.y = cc.winSize.height/2 - owner.height/2;

        let scaleX = (cc.winSize.width - this.padding) / ownerSize.width;
        let scaleY = (cc.winSize.height - this.padding) / ownerSize.height;

        let targetScale = 1
        if(scaleX < scaleY){
            owner.setAnchorPoint(0.5, 0.5);
            owner.x = cc.winSize.width/2 - owner.width/2;
            targetScale = scaleX;
        }
        else{
            owner.setAnchorPoint(0.0, 0.5);
            owner.setAnchorPoint
            owner.x = this.padding/5;
            targetScale = scaleY;
        }
        
        owner.setScale(targetScale);
        this.isResizeContent = false;
    }
}