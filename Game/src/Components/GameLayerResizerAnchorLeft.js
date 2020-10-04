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

        owner.y = cc.winSize.height/2 - owner.height/2;

        // Checks target scale between horizontal and axis
        let scaleX = (cc.winSize.width - this.padding) / ownerSize.width;
        let scaleY = (cc.winSize.height - this.padding) / ownerSize.height;

        let targetScale = 1

        // Checks which scale is greater
        if(scaleX < scaleY){
            // Game layer is anchored to middle if on portrait mode
            owner.setAnchorPoint(0.5, 0.5);
            owner.x = cc.winSize.width/2 - owner.width/2;
            targetScale = scaleX;
        }
        else{
            // Game layer is anchored to the left if on landscape mode
            owner.setAnchorPoint(0.0, 0.5);
            owner.setAnchorPoint
            owner.x = this.padding/5;
            targetScale = scaleY;
        }
        
        owner.setScale(targetScale);
        this.isResizeContent = false;
    }
}