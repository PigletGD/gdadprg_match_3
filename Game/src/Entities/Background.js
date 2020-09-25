class Background extends cc.Sprite
{
    constructor(spriteFilePath){
        super(spriteFilePath);
        this.setAnchorPoint(0.0, 0.0);

        this.addComponent(new FitToWindow());
    }
}