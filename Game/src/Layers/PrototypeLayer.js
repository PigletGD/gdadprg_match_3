class PrototypeLayer extends cc.LayerColor
{
	constructor(gameSize = cc.winSize, bgColor = cc.color("#ff00ff"))
	{
		super(bgColor, gameSize.width, gameSize.height);
		this.setName("PrototypeLayer");


	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();

		let board = new Board("Board", cc.size(1, 1), cc.size(64, 64));
		// board.x = this.getContentSize().width / 2 - board.width / 2;
		board.y = this.getContentSize().height;

		this.addChild(board);
	}
}