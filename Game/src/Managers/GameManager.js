
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

	get score()
	{
		return this._score;
	}

	set score(val)
	{
		this._score = val;
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