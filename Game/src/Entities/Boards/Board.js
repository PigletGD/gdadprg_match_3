// TODO: Generate board based on an texture file

/**
 *
Example:

Input:
a texture that is 8 x 8

if color == white -> possible tile location

if color == black -> tile cannot be placed
 */

// CONSTANTS
const MIN_BOARD_SIZE = 8;
const MIN_TILE_SIZE = 16;

class Board extends cc.DrawNode
{
	constructor(
		name = "DefaultBoard",
		boardSize = cc.size(MIN_BOARD_SIZE, MIN_BOARD_SIZE),
		tileSize = cc.size(MIN_TILE_SIZE, MIN_TILE_SIZE)
	)
	{
		super();
		this.setName(name);
		this.setAnchorPoint(0.0, 0.0);

		this._array = new Array(boardSize.width * boardSize.height);
		this._boardSize = boardSize;
		this._tileSize = tileSize;
	}

	onEnter()
	{
		super.onEnter();

		let totalWidth = this._boardSize.width * this._tileSize.width;
		let totalHeight = this._boardSize.height * this._tileSize.height;

		this.drawRect(
			cc.p(0, 0),
			cc.p(totalWidth, totalHeight),
			cc.color("#000000"));

		if (cc.isDebugMode)
		{
			let debugDot = new cc.DrawNode();
			debugDot.drawDot(cc.p(0, 0), 5, cc.color("#ff0000"));
			this.addChild(debugDot);
		}
	}

	get width()
	{
		return this._boardSize.width * this._tileSize.width;
	}

	get height()
	{
		return this._boardSize.height * this._tileSize.height;
	}

	get boardSize()
	{
		return this._boardSize;
	}

	get tileSize()
	{
		return this._tileSize;
	}

	place(item, row, column)
	{
		let prevItem = this._array[row * this._boardSize.height + column];
		this._array[row * this._boardSize.height + column] = item;
		return prevItem;
	}

	addTile(tile, x, y)
	{
		let tilePosition = cc.p(
			x * this._tileSize.width,
			y * this._tileSize.height
		);

		let newTile = new Tile(
			tile.sprite,
			tilePosition,
			this._tileSize,
			tile.bgColor);

		this._array[y * this._boardSize.height + x] = newTile;
		this.addChild(newTile);
	}

}