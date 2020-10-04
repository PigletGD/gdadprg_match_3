

/********************************
BoardManager manages the game boards.
It generates the board to be used.
It destroys the board used.
********************************/
const TILE_TYPE_0 = 0;
const TILE_TYPE_1 = 1;
const TILE_TYPE_2 = 2;
const TILE_TYPE_3 = 3;
const TILE_TYPE_4 = 4;
const TILE_TYPE_5 = 5;

class BoardManager
{
	static getInstance()
	{
		if (BoardManager._sharedInstance == undefined)
		{
			BoardManager._sharedInstance = new BoardManager();
			BoardManager._sharedInstance.init();
		}

		return BoardManager._sharedInstance;
	}

	init()
	{
		this.tileTypes = new Array();
		let tileSize = cc.size(16, 16);
		this.tileTypes.push(new TileButton(TILE_TYPE_0, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		this.tileTypes.push(new TileButton(TILE_TYPE_1, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		this.tileTypes.push(new TileButton(TILE_TYPE_2, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		this.tileTypes.push(new TileButton(TILE_TYPE_3, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		this.tileTypes.push(new TileButton(TILE_TYPE_4, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
		this.tileTypes.push(new TileButton(TILE_TYPE_5, res.Button9Slice_png, res.Button9SliceSelected_png, tileSize));
	}

	get board()
	{
		return this._currentBoard;
	}

	createBoard(size, contentSize)
	{
		this.currentBoard = new Board("Board", cc.size(size.width, size.height),
			cc.size(contentSize.width / size.width, contentSize.height / size.height));

		for (let row = 0; row < this.currentBoard.boardSize.height; row++)
		{
			for (let col = 0; col < this.currentBoard.boardSize.width; col++)
			{
				let randomIndex;

				let board = this.currentBoard;

				do
				{
					randomIndex = getRandomInt(0, this.tileTypes.length - 1);
				}
				while ((row >= 2 &&
					board._array[(row - 1) * board.boardSize.height + col].tileType == randomIndex &&
					board._array[(row - 2) * board.boardSize.height + col].tileType == randomIndex)
					||
					(col >= 2 &&
						board._array[row * board.boardSize.height + (col - 1)].tileType == randomIndex &&
						board._array[row * board.boardSize.height + (col - 2)].tileType == randomIndex));

				let tile = this.tileTypes[randomIndex];
				this.currentBoard.addTile(tile, row, col);

			}
		}
		return this.currentBoard;
	}

	generateTile(row, col)
	{
		let randomIndex = getRandomInt(0, this.tileTypes.length - 1);
		let tile = this.tileTypes[randomIndex];
		this.currentBoard.addTile(tile, row, col);
	}

}