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

		let titleBackground = new Background("TitleBackground", res.TitleBackground_png);
		this.addChild(titleBackground);

		let titleLandscapeLayout = new MainMenuLandscapeLayout();
		titleLandscapeLayout.setName("MainMenuLandscapeLayout");
		this.addChild(titleLandscapeLayout);

		let titlePortraitLayout = new MainMenuPortraitLayout();
		titlePortraitLayout.setName("MainMenuPortraitLayout");
		this.addChild(titlePortraitLayout);
	}
}