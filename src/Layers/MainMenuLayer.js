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
		console.log("Test");
	}

}