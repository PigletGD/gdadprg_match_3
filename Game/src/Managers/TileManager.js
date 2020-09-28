
class TileManager
{
	static getInstance()
	{
		if (GameManager._sharedInstance == undefined)
		{
			GameManager._sharedInstance = new GameManager();
		}

		return GameManager._sharedInstance;
	}

	addTileType(tile)
	{
		this._tileTypes.push(tile);
	}

	getRandomTileType()
	{
	}




}