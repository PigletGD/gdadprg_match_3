class Background extends cc.Sprite
{
    constructor(name, spriteFilePath){
        super(spriteFilePath);
        this.setName(name);
        this.setAnchorPoint(0.0, 0.0);
    }
}