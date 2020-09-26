var currentID = 0;

class TileButton extends ccui.Button
{
	constructor(iconSpriteFilePath, normalSpriteFilePath, selectedSpriteFilePath, position, size, color)
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
		currentID++;
		// console.log(this);

		// GameManager.getInstance().test();

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

        let rect = new cc.DrawNode();
        rect.drawRect(
			cc.p(0, 0),
			cc.p(this.size.width, this.size.height),
            this.bgColor);
        
        this.addChild(rect);
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
    
    onClick(){
        console.log("test");
    }
}