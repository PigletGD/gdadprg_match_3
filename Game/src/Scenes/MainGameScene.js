class MainGameScene extends cc.Scene
{
	constructor()
	{
		super();
	}

	onEnter()
	{
		super.onEnter();

		this.addChild(new Background("GameBackground", res.GameBackground_png));
		this.addChild(new MainGameLayer());
		this.addChild(new MainGameLandscapeLayout());
		this.addChild(new MainGamePortraitLayout());
	}
}