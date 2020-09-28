
class MainGameLayer extends cc.LayerColor
{
    constructor()
    {
        super(cc.color(0, 100, 0, 255), 800, 700);
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
        this.board = BoardManager.getInstance().createBoard(cc.size(8, 8), this.getContentSize());
        this.board.addComponent(new FitToParent());
        this.addChild(this.board);
    }
}