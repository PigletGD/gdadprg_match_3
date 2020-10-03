class LeaderboardLandscapeLayout extends LandscapeLayout
{
	constructor()
	{
		super("LeaderboardLandscapeLayout");
	}

	onEnter()
	{
		super.onEnter();
		// this.createLeaderboardTitleText(this);

		let layout = new ccui.Layout(cc.winSize);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setPositionType(ccui.Widget.POSITION_PERCENT);
		layout.setPositionPercent(cc.p(0.5, 0.5));
		layout.setSizeType(ccui.Widget.SIZE_PERCENT);
		layout.setSizePercent(cc.p(1.0, 1.0));
		// layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		// layout.setBackGroundColor(cc.color(0, 0, 150, 255));
		layout.addComponent(new FitToParent());

		let layoutParameter = new ccui.RelativeLayoutParameter();
		layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
		layoutParameter.setMargin(0, 0, 0, 0);
		layout.setLayoutParameter(layoutParameter);

		this.createLeaderboardTitleText(layout);

		this.entries  =
		 [{"rank" : 0, "name": "TTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100}];

		this.createLeaderboardHeaders(layout);

		this.getRankings();

		this.createButton(layout, "BACK", this.onClickBack);

		this.addChild(layout);
	}

	createLeaderboardHeaders(parent)
	{
		for (let i = 0; i < 3; i++)
		{
			let layout = new ccui.VBox();
			layout.setAnchorPoint(0.0, 1.0);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(i / 3, 0.8));

			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1 / 3, 0.8));

			// layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			// layout.setBackGroundColor(cc.color((50* i),0 , 150, 255));
	
			layout.addComponent(new FitToParent());
	
			let layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
			layoutParameter.setMargin(0, 0, 0, 0);
			layout.setLayoutParameter(layoutParameter);

			switch (i)
			{ 
				case 0:
				{
					this.createRankEntries(layout)
				} break;
				case 1:
				{
					this.createNameEntries(layout)
				} break;
				case 2:
				{
					this.createScoreEntries(layout)
				} break;
			}
			parent.addChild(layout);
		}
	}

	createRankEntries(parent)
	{
		let rankHeader = "Rank";
        let rankText = new Text(
			"RankHeader",
			rankHeader,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		rankText.setAnchorPoint(0.0, 0.5);
		parent.addChild(rankText);

		// Add entries
		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].rank;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"RankEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createNameEntries(parent)
	{
		let nameHeader = "Name";
        let nameText = new Text(
			"NameHeader",
			nameHeader,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		nameText.setAnchorPoint(0.0, 0.5);
		parent.addChild(nameText);

		// Add entries
		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].name;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"NameEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createScoreEntries(parent)
	{
		let scoreHeader = "Score";
        let scoreText = new Text(
		"ScoreHeader",
		scoreHeader,
		res.PixelFont.name,
		48,
		cc.p(0.0, 0.0),
		{
			color: cc.color(0, 0, 0, 255),
			stroke: 4
		})

		scoreText.setAnchorPoint(0.0, 0.5);
		parent.addChild(scoreText);

		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].score;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"ScoreEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createTextPercent(parent, name, message, x, y, size)
	{
		let text = new ccui.Text(message, "Pixel", size);
		text.setName(name);
		text.setPositionType(ccui.Widget.POSITION_PERCENT);
		text.setPositionPercent(cc.p(x, y));
		text.enableOutline(cc.color(0, 0, 0, 255), 4);
		parent.addChild(text);
		text.addComponent(new FitToParent());
	}
	
	getRankings() {
		ScoreManager.getInstance().getNTopEntries(10);

		//for(let i = 0; i < userInfo.users.length; i++){
		// 	console.log(userInfo.users[i].score);
		//}
	}
	
	/****
	Entry
	{
		"rank": 0
		"name": <name>,
		"score": <score>
	}
	*/

	createLeaderboardTitleText(parent)
	{
		let prompt  = "Leaderboard";
		parent.addChild(new Text(
			"Leaderboard",
			prompt,
			res.PixelFont.name,
			48,
			cc.p(0.5, 0.9),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));
	}

	// Create a button
	createButton(parent, text, bindingFunction)
	{
		let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
		button.setName(text);
		button.setScale9Enabled(true);
		button.setCapInsets(cc.rect(20, 20, 20, 20));
		button.setContentSize(cc.size(125, 55));
		button.setTitleFontSize(32);
		button.setTitleFontName("Pixel");
		button.setTitleText(text);
		button.setPositionType(ccui.Widget.POSITION_PERCENT);
		button.setPositionPercent(cc.p(1.0, 0.05));
		button.setAnchorPoint(cc.p(1.0, 0.0));
		button.addComponent(new FitToParent());

		// Binds function to the button for click event
		button.addClickEventListener(bindingFunction.bind(this));
		parent.addChild(button);
	}

	onClickBack()
	{
		// ScoreManager.getInstance().printAllUsers(); Working, but might not need rn
		cc.director.runScene(new MainMenuScene());
	}
}

class LeaderboardPortraitLayout extends PortraitLayout
{
	constructor()
	{
		super("LeaderboardPortraitLayout");
	}

	onEnter()
	{
		super.onEnter();

		let layout = new ccui.Layout(cc.winSize);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setPositionType(ccui.Widget.POSITION_PERCENT);
		layout.setPositionPercent(cc.p(0.5, 0.5));
		layout.setSizeType(ccui.Widget.SIZE_PERCENT);
		layout.setSizePercent(cc.p(1.0, 1.0));
		layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
		layout.setBackGroundColor(cc.color(0, 0, 150, 255));
		layout.addComponent(new FitToParent());

		let layoutParameter = new ccui.RelativeLayoutParameter();
		layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
		layoutParameter.setMargin(0, 0, 0, 0);
		layout.setLayoutParameter(layoutParameter);

		this.createLeaderboardTitleText(layout);

		this.entries  =
		 [{"rank" : 0, "name": "TTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100},
		{"rank" : 0, "name": "TTTTTTTTTTTTTTTTTT", "score": 100}];

		this.createLeaderboardHeaders(layout);

		this.getRankings();

		this.createButton(layout, "BACK", this.onClickBack);

		this.addChild(layout);
	}

	createLeaderboardHeaders(parent)
	{
		for (let i = 0; i < 3; i++)
		{
			let layout = new ccui.VBox();
			layout.setAnchorPoint(0.0, 1.0);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(i / 3, 0.8));

			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1 / 3, 0.8));

			// layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
			// layout.setBackGroundColor(cc.color((50* i),0 , 150, 255));
	
			layout.addComponent(new FitToParent());
	
			let layoutParameter = new ccui.RelativeLayoutParameter();
			layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_TOP_LEFT);
			layoutParameter.setMargin(0, 0, 0, 0);
			layout.setLayoutParameter(layoutParameter);

			switch (i)
			{ 
				case 0:
				{
					this.createRankEntries(layout)
				} break;
				case 1:
				{
					this.createNameEntries(layout)
				} break;
				case 2:
				{
					this.createScoreEntries(layout)
				} break;
			}
			parent.addChild(layout);
		}
	}

	createRankEntries(parent)
	{
		let rankHeader = "Rank";
        let rankText = new Text(
			"RankHeader",
			rankHeader,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		rankText.setAnchorPoint(0.0, 0.5);
		parent.addChild(rankText);

		// Add entries
		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].rank;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"RankEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createNameEntries(parent)
	{
		let nameHeader = "Name";
        let nameText = new Text(
			"NameHeader",
			nameHeader,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		nameText.setAnchorPoint(0.0, 0.5);
		parent.addChild(nameText);

		// Add entries
		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].name;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"NameEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createScoreEntries(parent)
	{
		let scoreHeader = "Score";
        let scoreText = new Text(
		"ScoreHeader",
		scoreHeader,
		res.PixelFont.name,
		30,
		cc.p(0.0, 0.0),
		{
			color: cc.color(0, 0, 0, 255),
			stroke: 4
		})

		scoreText.setAnchorPoint(0.0, 0.5);
		parent.addChild(scoreText);

		for (let i = 0; i < 5; i++)
		{
			let entryLabel = this.entries[i].score;

			if (entryLabel === undefined || entryLabel === null)
			{
				break;
			}

			let entryText =  new Text(
			"ScoreEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 0
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}
	}

	createTextPercent(parent, name, message, x, y, size)
	{
		let text = new ccui.Text(message, "Pixel", size);
		text.setName(name);
		text.setPositionType(ccui.Widget.POSITION_PERCENT);
		text.setPositionPercent(cc.p(x, y));
		text.enableOutline(cc.color(0, 0, 0, 255), 4);
		parent.addChild(text);
		text.addComponent(new FitToParent());
	}
	
	getRankings() {
		//ScoreManager.getInstance().getNTopEntries(10);

		//for(let i = 0; i < userInfo.users.length; i++){
		// 	console.log(userInfo.users[i].score);
		//}
	}
	
	/****
	Entry
	{
		"rank": 0
		"name": <name>,
		"score": <score>
	}
	*/

	createLeaderboardTitleText(parent)
	{
		let prompt  = "Leaderboard";
		parent.addChild(new Text(
			"Leaderboard",
			prompt,
			res.PixelFont.name,
			48,
			cc.p(0.5, 0.9),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			}));
	}

	// Create a button
	createButton(parent, text, bindingFunction)
	{
		let button = new ccui.Button(res.Button9Slice_png, res.Button9SliceSelected_png);
		button.setName(text);
		button.setScale9Enabled(true);
		button.setCapInsets(cc.rect(20, 20, 20, 20));
		button.setContentSize(cc.size(125, 55));
		button.setTitleFontSize(32);
		button.setTitleFontName("Pixel");
		button.setTitleText(text);
		button.setPositionType(ccui.Widget.POSITION_PERCENT);
		button.setPositionPercent(cc.p(1.0, 0.05));
		button.setAnchorPoint(cc.p(1.0, 0.0));
		button.addComponent(new FitToParent());

		// Binds function to the button for click event
		button.addClickEventListener(bindingFunction.bind(this));
		parent.addChild(button);
	}

	onClickBack()
	{
		// ScoreManager.getInstance().printAllUsers(); Working, but might not need rn
		cc.director.runScene(new MainMenuScene());
	}
}