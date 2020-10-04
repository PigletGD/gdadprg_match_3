class LeaderboardLandscapeLayout extends LandscapeLayout
{
	constructor()
	{
		super("LeaderboardLandscapeLayout");
	}

	onEnter()
	{
		super.onEnter();

		// Set up necessary members
		this.maxEntriesShown = 5;
		this.entries = new Array();
		this.userEntry = {"rank" : "-", "name" : " ", "score" : 0};

		// Setup the layout
		let layout = new ccui.Layout(cc.winSize);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setPositionType(ccui.Widget.POSITION_PERCENT);
		layout.setPositionPercent(cc.p(0.5, 0.5));
		layout.setSizeType(ccui.Widget.SIZE_PERCENT);
		layout.setSizePercent(cc.p(1.0, 1.0));
		layout.addComponent(new FitToParent());

		let layoutParameter = new ccui.RelativeLayoutParameter();
		layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
		layoutParameter.setMargin(0, 0, 0, 0);
		layout.setLayoutParameter(layoutParameter);

		this.createLeaderboardTitleText(layout);
		this.setEntries();
		this.createLeaderboardHeaders(layout);
		this.createButton(layout, "BACK", this.onClickBack);

		this.addChild(layout);
	}

	// Creates the leaderboard headers and their corresponding data
	createLeaderboardHeaders(parent)
	{
		for (let i = 0; i < 3; i++)
		{
			let spanRatio = 0;
			if (i === 1)
			{
				spanRatio = 1 / 5;
			}
			else
			{
				spanRatio = i  / 3;
			}

			let layout = new ccui.VBox();
			layout.setAnchorPoint(0.0, 1.0);
			layout.setPositionType(ccui.Widget.POSITION_PERCENT);
			layout.setPositionPercent(cc.p(spanRatio, 0.8));

			layout.setSizeType(ccui.Widget.SIZE_PERCENT);
			layout.setSizePercent(cc.p(1 /3, 0.8));

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
		for (let i = 0; i < this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].rank;
			let entryText =  new Text(
			"RankEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(25, 25, 25, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Adds entry of the user
		let userHeader = new Text(
			"UserHeader",
			"User:",
			res.PixelFont.name,
			28,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		let userRank = new Text(
			"UserHeader",
			this.userEntry.rank,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

		userRank.setAnchorPoint(0.0, 0.5);
		parent.addChild(userRank);

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
		for (let i = 0; i < this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].name;
			let entryText =  new Text(
			"NameEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Adds entry of the user
		let userHeader = new Text(
			"UserHeader",
		" ",
		res.PixelFont.name,
		24,
		cc.p(0.0, 0.0),
		{
			color: cc.color(0, 0, 0, 255),
			stroke: 2
		});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		let userName = new Text(
			"UserName",
		this.userEntry.name,
		res.PixelFont.name,
		24,
		cc.p(0.0, 0.0),
		{
			color: cc.color(0, 0, 0, 255),
			stroke: 2
		});

		userName.setAnchorPoint(0.0, 0.5);
		parent.addChild(userName);
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

		// Add entries
		for (let i = 0; i < this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].score;
			let entryText =  new Text(
			"ScoreEntry" + i,
			entryLabel,
			res.PixelFont.name,
			30,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Adds entry of the user
		let userHeader = new Text(
			"UserHeader",
			" ",
			res.PixelFont.name,
			28,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		let userScore = new Text(
			"UserScore",
			this.userEntry.score,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userScore.setAnchorPoint(0.0, 0.5);
			parent.addChild(userScore);
	}

	// Sets the value of the entries and user attribute that will be shown in the leaderboard
	setEntries() {
		let rankedEntries = ScoreManager.getInstance().orderedRanks;

		console.log(rankedEntries);

		for(let i = 0; i < rankedEntries.length; i++) {
			this.entries.push({ "rank": i + 1, "name": rankedEntries[i].name, "score": rankedEntries[i].score });
		}

		if (ScoreManager.getInstance().playerInfo !== undefined)
			this.userEntry = ScoreManager.getInstance().playerInfo;
	}

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

		// Setup necessary attributes
		this.maxEntriesShown = 5;
		this.entries  = new Array();
		this.userEntry = {"rank" : "-", "name" : " ", "score" : 0};

		// Setup layout
		let layout = new ccui.Layout(cc.winSize);
		layout.setAnchorPoint(0.5, 0.5);
		layout.setPositionType(ccui.Widget.POSITION_PERCENT);
		layout.setPositionPercent(cc.p(0.5, 0.5));
		layout.setSizeType(ccui.Widget.SIZE_PERCENT);
		layout.setSizePercent(cc.p(1.0, 1.0));

		layout.addComponent(new FitToParent());

		let layoutParameter = new ccui.RelativeLayoutParameter();
		layoutParameter.setAlign(ccui.RelativeLayoutParameter.PARENT_RIGHT_BOTTOM);
		layoutParameter.setMargin(0, 0, 0, 0);
		layout.setLayoutParameter(layoutParameter);

		this.createLeaderboardTitleText(layout);
		this.setEntries();
		this.createLeaderboardHeaders(layout);
		this.createButton(layout, "BACK", this.onClickBack);

		this.addChild(layout);
	}

	// Creates the leaderboard headers and their corresponding data
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
		for (let i = 0; i < this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].rank;
			let entryText =  new Text(
			"RankEntry" + i,
			entryLabel,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Add user entry
		let userHeader = new Text(
			"UserHeader",
			"User:",
			res.PixelFont.name,
			28,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		console.log("USER RANK: " + this.userEntry.rank);

		let userRank = new Text(
			"UserHeader",
			this.userEntry.rank,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

		userRank.setAnchorPoint(0.0, 0.5);
		parent.addChild(userRank);

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
		for (let i = 0; i <  this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].name;
			let entryText =  new Text(
			"NameEntry" + i,
			entryLabel,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Add user entry
		let userHeader = new Text(
			"UserHeader",
			" ",
			res.PixelFont.name,
			28,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		let userName = new Text(
			"UserName",
		this.userEntry.name,
		res.PixelFont.name,
		24,
		cc.p(0.0, 0.0),
		{
			color: cc.color(0, 0, 0, 255),
			stroke: 2
		});

		userName.setAnchorPoint(0.0, 0.5);
		parent.addChild(userName);
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

		// Add entries
		for (let i = 0; i <  this.maxEntriesShown; i++)
		{
			if (i === this.entries.length)
			{
				break;
			}

			let entryLabel = this.entries[i].score;

			let entryText =  new Text(
			"ScoreEntry" + i,
			entryLabel,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			entryText.setAnchorPoint(0.0, 0.5);
			parent.addChild(entryText);
		}

		// Add user entry
		let userHeader = new Text(
			"UserHeader",
			" ",
			res.PixelFont.name,
			28,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 4
			});

		userHeader.setAnchorPoint(0.0, 0.5);
		parent.addChild(userHeader);

		let userScore = new Text(
			"UserScore",
			this.userEntry.score,
			res.PixelFont.name,
			24,
			cc.p(0.0, 0.0),
			{
				color: cc.color(0, 0, 0, 255),
				stroke: 2
			});

			userScore.setAnchorPoint(0.0, 0.5);
			parent.addChild(userScore);
	}

	// Sets the value of the entries and user attribute that will be shown in the leaderboard
	setEntries() {
		let rankedEntries = ScoreManager.getInstance().orderedRanks;

		console.log(rankedEntries);

		for(let i = 0; i < rankedEntries.length; i++) {
			this.entries.push({ "rank": i + 1, "name": rankedEntries[i].name, "score": rankedEntries[i].score });
		}

		if (ScoreManager.getInstance().playerInfo !== undefined)
			this.userEntry = ScoreManager.getInstance().playerInfo;
	}
	
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
		cc.director.runScene(new MainMenuScene());
	}
}