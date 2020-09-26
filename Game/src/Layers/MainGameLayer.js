class MainGameLayer extends cc.LayerColor
{
	constructor()
	{
        super(cc.color(0,100,0,255), 800, 700);
        this.setAnchorPoint(0.5, 0.5)
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();

		this.addComponent(new GameLayerResizerAnchorLeft(60));
	}
}