class LandscapeLayout extends ccui.RelativeBox
{
    constructor(name)
    {
        super();
        this.setName(name);
        this.scheduleUpdate();
    }

    onEnter()
    {
        super.onEnter();
        this.setContentSize(cc.winSize);

        this.addComponent(new FitToWindow());
        this.addComponent(new EnableOnLandscape());
    }
}