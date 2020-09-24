// TODO: BoardManager
// It creates a board.
// It handles creating additional tiles when a match is found.
// It stores all the tile types to be generated as tiles
// OPTIONAL: Create a certain board type.
// OPTIONAL: Shuffle when no match can be found.
function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var instance = null;
class BoardManager
{
	constructor()
	{
		if (!instance)
		{
			instance = this;
		}

		this._tileTypes = new Array();

		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ffff00")));
		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff00ff")));
		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ffff")));
		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff0000")));
		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#0000ff")));
		this._tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ff00")));

		this.board = new Board("Board", cc.size(8, 8), cc.size(64, 64));

		return instance;
	}

	getInstance()
	{
		if (!instance)
		{
			instance = createInstance();
		}
		return instance;
	}

	addTileType(tile)
	{
		this._tileTypes.push(tile);
	}

	//TODO: BoardFactory
	createBoard()
	{
		// this.board = new Board("Board", cc.size(8, 8), cc.size(64, 64));

		for (let row = 0; row < this.board.boardSize.height; row++)
		{
			for (let col = 0; col < this.board.boardSize.width; col++)
			{
				let tile = this._tileTypes[getRandomInt(0, this._tileTypes.length - 1)];
				this.board.addTile(tile, col, row);
			}
		}

		return this.board;
	}
}

const boardManager = new BoardManager();
Object.freeze(boardManager);