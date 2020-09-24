

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

	test()
	{
		console.log("Test");;
	}
}