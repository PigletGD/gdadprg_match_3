class RulesLayer extends cc.LayerColor
{
    constructor()
    {
        super();
    }

    onEnter()
    {
        super.onEnter();
        this.scheduleUpdate();

        let titleBackground = new Background("TitleBackground", res.TitleBackground_png);
        this.addChild(titleBackground);

        let rulesLandscapeLayout = new RulesLandscapeLayout();
        rulesLandscapeLayout.setName("RulesLandscapeLayout");
        this.addChild(rulesLandscapeLayout);

        let rulesPortraitLayout = new RulesPortraitLayout();
        rulesPortraitLayout.setName("RulesPortraitLayout");
        this.addChild(rulesPortraitLayout);
    }
}