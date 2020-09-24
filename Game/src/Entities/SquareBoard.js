class SquareBoard extends Board
{
	constructor(squareSize = MIN_BOARD_SIZE, tileSize = MIN_TILE_SIZE)
	{
		super("SquareBoard", cc.size(squareSize, squareSize), cc.size(tileSize, tileSize));
	}
}