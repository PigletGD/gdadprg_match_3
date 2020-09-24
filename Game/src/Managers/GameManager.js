
/********************************
GameManager manages the state of the game
********************************/
class GameManager
{
	static getInstance()
	{
		if (GameManager._sharedInstance == undefined)
		{
			GameManager._sharedInstance = new GameManager();
		}

		return GameManager._sharedInstance;
	}

	pauseGame()
	{
		this._isPaused = true;
	}

	resumeGame()
	{
		this._isPaused = false;
	}

	isPaused()
	{
		return this._isPaused;
	}

}