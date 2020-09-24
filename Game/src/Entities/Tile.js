var currentID = 0;

class Tile extends cc.DrawNode
{
	constructor(spriteFilepath, position, size, color)
	{
		super();
		this.setAnchorPoint(1.0, 1.0);
		this.setPosition(position);
		this.size = size;
		this.bgColor = color;
		this.id = currentID;
		this.isSelected = false;
		currentID++;
		console.log(this);

		this.sprite = new cc.Sprite(spriteFilepath);
		this.sprite.setAnchorPoint(0.0, 0.0);
		let originalSize = this.sprite.getContentSize();
		this.sprite.setScale(size.width / originalSize.height, size.height / originalSize.height);
	}

	onEnter()
	{
		super.onEnter();

		this.drawRect(
			cc.p(0, 0),
			cc.p(this.size.width, this.size.height),
			this.bgColor);

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
}