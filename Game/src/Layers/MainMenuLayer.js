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

		this.test();

		let titleBackground = new Background("TitleBackground", res.TitleBackground_png);
		this.addChild(titleBackground);

		let titleLandscapeLayout = new MainMenuLandscapeLayout();
		titleLandscapeLayout.setName("MainMenuLandscapeLayout");
		this.addChild(titleLandscapeLayout);

		let titlePortraitLayout = new MainMenuPortraitLayout();
		titlePortraitLayout.setName("MainMenuPortraitLayout");
		this.addChild(titlePortraitLayout);
	}

	async test()
	{
		return await UserService.getInstance().getAllUsersInfo().then(
			(users) => {
				console.log(users.users.length);
				for (let i = 0; i < users.users.length; i++)
				{
					console.log(users.users[i]);
				}

			});

	}
}