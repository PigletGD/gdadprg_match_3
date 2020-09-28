
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
		this._selectedTile = null;
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

	addTile(tileRef, row, col)
	{
		let newTileButtonTest = new TileButton(
			tileRef.tileType,
			res.Button9Slice_png,
			res.Button9SliceSelected_png,
			this.tileSize,
			this,
			row, col);

		this._array[row * this._boardSize.height + col] = newTileButtonTest;
		this.addChild(newTileButtonTest);
	}

	setSelectedTile(tilePos)
	{
		let currentTile = this._array[tilePos.row * this._boardSize.height + tilePos.col];

		if (this._selectedTile === null && currentTile.isSelected === false)
		{
			this.selectTile(currentTile);
		}
		else if (this._selectedTile !== null && currentTile.isSelected === false)
		{
			let magnitude = Math.abs(this._selectedTile.row - currentTile.row) +
				Math.abs(this._selectedTile.col - currentTile.col);

			if (magnitude === 1)
			{
				let indexA = this._selectedTile.row * this._boardSize.height + this._selectedTile.col;
				let indexB = currentTile.row * this._boardSize.height + currentTile.col;
				this.swapTiles(indexA, indexB);
				this.validateMatches();
				this.unselectTile();
			}
			else
			{
				this.unselectTile();
			}
		}
	}

	selectTile(tile)
	{
		this._selectedTile = tile;
		this._selectedTile.setColor(cc.color("#aaaaaa"));
		this._selectedTile.isSelected = true;
	}

	unselectTile()
	{
		this._selectedTile.isSelected = false;
		this._selectedTile.setColor(cc.color("#ffffff"));
		this._selectedTile = null;
	}

	swapTiles(indexA, indexB)
	{
		let tempPos = this._array[indexA].getPosition();
		let tempRowCol = {row: this._array[indexA].row, col: this._array[indexA].col};

		let bPos = this._array[indexB].getPosition();
		let bRowCol = {row: this._array[indexB].row, col: this._array[indexB].col};

		this._array[indexA].setPosition(bPos.x, bPos.y);
		this._array[indexA].row = bRowCol.row;
		this._array[indexA].col = bRowCol.col;

		this._array[indexB].setPosition(tempPos.x, tempPos.y);
		this._array[indexB].row = tempRowCol.row;
		this._array[indexB].col = tempRowCol.col;

		[this._array[indexA], this._array[indexB]] = [this._array[indexB], this._array[indexA]];

	}

	update(timestep)
	{
		if (GameManager.getInstance().isPaused())
		{
			for (let i = 0; i < this._array.length; i++)
			{
				if (this._array[i] !== null)
				{
					this._array[i].setTouchEnabled(false);

				}
			}
		}
		else
		{
			for (let i = 0; i < this._array.length; i++)
			{
				if (this._array[i] !== null)
				{
					this._array[i].setTouchEnabled(true);
				}

			}
		}
	}

	validateMatches()
	{
		// Checks the board for tiles that have a match
		let result, tempResult;

		result = false;
		for (let i = 0; i < this._array.length; i++)
		{
			tempResult = this.checkTileForMatches(this._array[i]);
			if (tempResult)
			{
				result = tempResult;
				this._array[i].isMatchFound = true;
				console.log("Match found");
			}
		}

		this.removeMatches();
		this.shiftTilesDown();
		this.fillEmptyTiles();

		if (result)
		{
			let delay = new cc.DelayTime(0.5);
			let callFunc = new cc.callFunc(() => this.validateMatches());
			this.runAction(new cc.sequence(delay, callFunc));
		}
	}

	checkTileForMatches(tile)
	{
		let vertical = this.checkUpMatches(tile) + this.checkDownMatches(tile);
		let horizontal = this.checkLeftMatches(tile) + this.checkRightMatches(tile);

		let vertMatch = false;
		let horiMatch = false;

		// then do whatever when found a match
		if (vertical >= 2) vertMatch = true;
		if (horizontal >= 2) horiMatch = true;
		//console.log(vertMatch);
		//console.log(horiMatch);
		return vertMatch || horiMatch;
	}

	checkRightMatches(tile)
	{
		let tilePosX = tile.col;
		let checkPosX = tile.col + 1;
		let foundDifferentTile = false;
		let similarTiles = 0;

		while (checkPosX < this.boardSize.width && !foundDifferentTile)
		{
			if (tile.tileType == this._array[tile.row * this.boardSize.height + checkPosX].tileType)
			{
				similarTiles++;
				checkPosX++;
			}
			else foundDifferentTile = true;
		}

		return similarTiles;
	}

	checkLeftMatches(tile)
	{
		let tilePosX = tile.col;
		let checkPosX = tile.col - 1;
		let foundDifferentTile = false;
		let similarTiles = 0;

		while (checkPosX >= 0 && !foundDifferentTile)
		{
			if (tile.tileType == this._array[tile.row * this.boardSize.height + checkPosX].tileType)
			{
				similarTiles++;
				checkPosX--;
			}
			else foundDifferentTile = true;
		}

		return similarTiles;
	}

	checkUpMatches(tile)
	{
		let tilePosY = tile.row;
		let checkPosY = tile.row + 1;
		let foundDifferentTile = false;
		let similarTiles = 0;

		while (checkPosY < this.boardSize.height && !foundDifferentTile)
		{
			if (tile.tileType == this._array[checkPosY * this.boardSize.height + tile.col].tileType)
			{
				similarTiles++;
				checkPosY++;
			}
			else foundDifferentTile = true;
		}

		return similarTiles;
	}

	checkDownMatches(tile)
	{
		let tilePosY = tile.row;
		let checkPosY = tile.row - 1;
		let foundDifferentTile = false;
		let similarTiles = 0;

		while (checkPosY >= 0 && !foundDifferentTile)
		{
			if (tile.tileType == this._array[checkPosY * this.boardSize.height + tile.col].tileType)
			{
				similarTiles++;
				checkPosY--;
			}
			else foundDifferentTile = true;
		}

		return similarTiles;
	}

	removeMatches()
	{
		// Removes tiles in the list that have a match
		for (let i = 0; i < this._array.length; i++)
		{
			if (this._array[i].isMatchFound)
			{
				console.log("Delete tile");

				this._array[i].parent.removeChild(this._array[i]);
				this._array[i] = null;
				this.rewardScore(10);
			}
		}
	}

	rewardScore(score)
	{
		GameManager.getInstance().addScore(score);
	}

	shiftTilesDown()
	{
		for (let col = 0; col < this.boardSize.width; col++)
		{
			this.swapUntilTop(col);
		}
	}

	swapUntilTop(colNumber)
	{
		console.log(colNumber);

		let i = 0;
		let j = 1;

		while (j < this._boardSize.height)
		{
			let iIndex = i * this.boardSize.height + colNumber;
			let jIndex = j * this.boardSize.height + colNumber;

			let iTile = this._array[iIndex];
			let jTile = this._array[jIndex];

			if (iTile === null)
			{
				if (jTile === null)
				{
					j++;
				}
				else
				{
					// swapping

					let tempPos = jTile.getPosition();

					jTile.setPosition(tempPos.x, tempPos.y - jTile.size.height * (j - i));
					jTile.row = jTile.row - (j - i);
					jTile.col = jTile.col;

					[this._array[iIndex], this._array[jIndex]] = [this._array[jIndex], this._array[iIndex]];

					i++;
					j++;
				}
			}
			else
			{
				i++;
				j++;
			}
		}
	}

	fillEmptyTiles()
	{
		for (let i = 0; i < this.boardSize.height; i++)
		{
			for (let j = 0; j < this.boardSize.width; j++)
			{
				if (this._array[i * this.boardSize.height + j] === null)
				{
					console.log(`Row ${i}, Col ${j}`);
					BoardManager.getInstance().generateTile(i, j);
				}
			}
		}
	}
}