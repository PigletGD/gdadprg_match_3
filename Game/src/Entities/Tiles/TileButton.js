var currentID = 0;

class TileButton extends ccui.Button
{
	constructor(tileType,
		normalSpriteFilePath,
		selectedSpriteFilePath,
		size,
		board,
		row,
		column)
	{
		super(normalSpriteFilePath, selectedSpriteFilePath);
		this.scheduleUpdate();

		this.size = size;
		this.id = currentID;
		this.isSelected = false;
		this.row = row;
		this.col = column;

		this.setAnchorPoint(0.0, 0.0);
		this.setScale9Enabled(true);
		this.setCapInsets(cc.rect(20, 20, 20, 20));
		this.setPosition(this.col * this.size.width, this.row * this.size.height);
		this.setContentSize(size);

		this.board = board;

		this.tileType = tileType;

		this.isMatchFound = false;

		currentID++;

		this.initSpriteFromType();

		this.addClickEventListener(this.onClick.bind(this));
	}

	initSpriteFromType()
	{
		switch (this.tileType)
		{
			case TILE_TYPE_0:
				{
					this.sprite = new cc.Sprite(res.BidetIcon_png);
				} break;
			case TILE_TYPE_1:
				{
					this.sprite = new cc.Sprite(res.PlungerIcon_png);
				} break;
			case TILE_TYPE_2:
				{
					this.sprite = new cc.Sprite(res.PoopIcon_png);
				} break;
			case TILE_TYPE_3:
				{
					this.sprite = new cc.Sprite(res.ScrubberIcon_png);
				} break;
			case TILE_TYPE_4:
				{
					this.sprite = new cc.Sprite(res.ToiletPaperIcon_png);
				} break;
			case TILE_TYPE_5:
				{
					this.sprite = new cc.Sprite(res.WaterIcon_png);
				} break;
		}

		this.sprite.setAnchorPoint(0.0, 0.0);
		let originalSize = this.sprite.getContentSize();
		this.sprite.setScale(this.size.width / originalSize.height, this.size.height / originalSize.height);
	}

	onEnter()
	{
		super.onEnter();

		this.addChild(this.sprite);

		let idText = new cc.LabelTTF(this.id.toString(), "Arial", 32);
		idText.setAnchorPoint(0, 0);
		this.addChild(idText);

		if (cc.isDebugMode)
		{
			let debugDot = new cc.DrawNode();
			debugDot.drawDot(cc.p(0, 0), 5, cc.color("#ff00ff"));
			this.addChild(debugDot);
		}
	}

	update(timestep)
	{
	}

	onClick()
	{
		this.board.setSelectedTile({col: this.col, row: this.row});
	}
}