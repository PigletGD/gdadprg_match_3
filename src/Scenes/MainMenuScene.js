
class MainMenuScene extends cc.Scene
{
	constructor()
	{
		super();
	}

	onEnter()
	{
		super.onEnter();
		this.addChild(new MainMenuLayer());
	}
}