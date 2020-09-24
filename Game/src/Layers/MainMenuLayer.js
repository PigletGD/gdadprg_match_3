class MainMenuLayer extends cc.LayerColor
{
	constructor()
	{
		super(cc.winSize);
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();
		let timer = new TimerEntity();
		this.addChild(timer);
	}


}