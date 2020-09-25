class MainMenuLayer extends cc.LayerColor
{
	constructor()
	{
		super();
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();

		let titleBackground = new Background(res.TitleBackground_png);
		this.addChild(titleBackground);

		let titleLandscapeLayout = new TitleLandscapeLayout();
		titleLandscapeLayout.setName("TitleLandscapeLayout");
		this.addChild(titleLandscapeLayout);

		let titlePortraitLayout = new TitlePortraitLayout();
		titlePortraitLayout.setName("TitlePortraitLayout");
		this.addChild(titlePortraitLayout);

		//let timer = new TimerEntity();
		//this.addChild(timer);
	}


}