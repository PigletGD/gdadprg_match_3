

class PrototypeLayer extends cc.LayerColor
{
	constructor(gameSize = cc.winSize, bgColor = cc.color("#ff00ff"))
	{
		super(bgColor, gameSize.width, gameSize.height);
		this.setName("PrototypeLayer");
		cc.winSize;

	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();


		// let board = boardManager.createBoard();
		// board.x = this.getContentSize().width / 2 - board.width / 2;
		// board.y = this.getContentSize().height / 2 - board.height / 2;

		// this.addChild(board);
	}
}