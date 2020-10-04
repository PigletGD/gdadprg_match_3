
class LeaderboardLayer extends cc.LayerColor
{
    constructor()
    {
        super();
    }

    onEnter(){
        super.onEnter();
        this.scheduleUpdate();

        UserService.getInstance().getLeaderboardRankings();

        let titleBackground = new Background("TitleBackground", res.TitleBackground_png);
		this.addChild(titleBackground);

        let leaderboardLandscapeLayout = new LeaderboardLandscapeLayout();
		leaderboardLandscapeLayout.setName("LeaderboardLandscapeLayout");
		this.addChild(leaderboardLandscapeLayout);

		let leaderboardPortraitLayout = new LeaderboardPortraitLayout();
		leaderboardPortraitLayout.setName("LeaderboardPortraitLayout");
		this.addChild(leaderboardPortraitLayout);
    }
}