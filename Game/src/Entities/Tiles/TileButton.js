var currentID = 0;
const TILE_TYPE_1 = 1;
const TILE_TYPE_2 = 1;
const TILE_TYPE_3 = 1;
const TILE_TYPE_4 = 1;
const TILE_TYPE_5 = 1;
const TILE_TYPE_6 = 1;
const TILE_TYPE_7 = 1;
class TileButton extends ccui.Button
{
	constructor(iconSpriteFilePath,
		normalSpriteFilePath,
		selectedSpriteFilePath,
		position,
		size,
		color,
		board,
		row, column)
	{
		super(normalSpriteFilePath, selectedSpriteFilePath);
		this.setAnchorPoint(0.0, 0.0);
		this.setScale9Enabled(true);
		this.setCapInsets(cc.rect(20, 20, 20, 20));
		this.setPosition(position);
		this.setContentSize(size);
		this.size = size;
		this.bgColor = color;
		this.id = currentID;
		this.isSelected = false;
		this._board = board;
		this.row = row;
		this.col = column;
		currentID++;
		// console.log(this);

		this.scheduleUpdate();
		this.sprite = new cc.Sprite(iconSpriteFilePath);
		this.sprite.setAnchorPoint(0.0, 0.0);
		let originalSize = this.sprite.getContentSize();
		this.sprite.setScale(size.width / originalSize.height, size.height / originalSize.height);

		// Binds function to the button for click event
		this.addClickEventListener(this.onClick.bind(this));
	}



	onEnter()
	{
		super.onEnter();

		// let rect = new cc.DrawNode();
		// rect.drawRect(
		// 	cc.p(0, 0),
		// 	cc.p(this.size.width, this.size.height),
		// 	this.bgColor);

		// this.addChild(rect);
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


	onClick()
	{
		this._board.setSelectedTile({col: this.col, row: this.row});
	}
}