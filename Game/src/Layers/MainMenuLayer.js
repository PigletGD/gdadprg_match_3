class MainMenuLayer extends ccui.VBox
{
	constructor()
	{
		super(cc.winSize);
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();
		let timer = new Timer();
		this.addChild(timer);
	}

}