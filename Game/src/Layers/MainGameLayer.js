class MainGameLayer extends cc.LayerColor
{
	constructor()
	{
        super(cc.color(0,100,0,255), 800, 700);
        this.setAnchorPoint(0.5, 0.5);
        this.board;
	}

	onEnter()
	{
		super.onEnter();
		this.scheduleUpdate();

        this.addComponent(new GameLayerResizerAnchorLeft(60));

        this.createBoard();
        
    }
    
    // Test function as I couldn't get board manager to work
    createBoard()
    {
    	let tileTypes = new Array();

		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ffff00")));
		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff00ff")));
		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ffff")));
		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff0000")));
		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#0000ff")));
		tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ff00")));

        let contentSize = this.getContentSize();

        this.board = new Board("Board", cc.size(8, 8), cc.size(contentSize.width / 8, contentSize.height / 8));

        for (let row = 0; row < this.board.boardSize.height; row++)
        {
            for (let col = 0; col < this.board.boardSize.width; col++)
            {
                let tile = tileTypes[getRandomInt(0, tileTypes.length - 1)];
                this.board.addTile(tile, col, row);
            }
        }

        this.board.addComponent(new FitToParent());

        this.addChild(this.board);
    }
}