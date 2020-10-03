
const GAME_STATE_INACTIVE = 1;
const GAME_STATE_PLAY_LEVEL = 2;
const GAME_STATE_RESULTS = 3;

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
			GameManager._sharedInstance._gameState = GAME_STATE_INACTIVE;
			GameManager._sharedInstance._score = 0;
			GameManager._sharedInstance._hasSetName = false;
		}

		return GameManager._sharedInstance;
	}

	get isNameSet()
	{
		return this._hasSetName;
	}
	nameHasSet()
	{
		this._hasSetName = true;
	}

	get gameState()
	{
		return this._gameState;
	}

	set gameState(gameState)
	{
		this._gameState = gameState;
	}
	get score()
	{
		return this._score;
	}

	set score(val)
	{
		this._score = val;
	}

	addScore(val)
	{
		this._score += val;
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