class MainGameScene extends cc.Scene
{
	constructor()
	{
		super();
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();

		this.timerEntity = new TimerEntity();
		this.addChild(this.timerEntity);
		this.addChild(new Background("GameBackground", res.GameBackground_png));
		this.addChild(new MainGameLayer());

		this.landscape = new MainGameLandscapeLayout();
		this.addChild(this.landscape);

		this.portrait = new MainGamePortraitLayout();
		this.addChild(this.portrait);

		this.timerEntity.startCountdown();

		this.isAccessed = false;
	}

	update(timestep)
	{
		if (this.timerEntity.remainingSeconds <= 0 && this.isAccessed === false)
		{
			GameManager.getInstance().gameState = GAME_STATE_RESULTS;

			if (GameManager.getInstance().highscore < GameManager.getInstance().score)
			{
				GameManager.getInstance().highscore = GameManager.getInstance().score;
				UserService.getInstance().updateScore(GameManager.getInstance().score);
			}

			this.addChild(new ResultsPopupLayout());
			GameManager.getInstance().pauseGame();
			this.isAccessed = true;
			this.landscape.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
			this.portrait.getChildByName("Button Layout").getChildByName("PAUSE").setEnabled(false);
		}

	}
}