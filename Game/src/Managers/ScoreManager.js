class ScoreManager
{
	static getInstance()
	{
		if (ScoreManager._sharedInstance == undefined)
		{
			ScoreManager._sharedInstance = new ScoreManager();
			ScoreManager._sharedInstance.userCache = new Array();
			ScoreManager._sharedInstance.scoreCache = new Array();
		}

		return ScoreManager._sharedInstance;
	}

	loadUserScoresFromJSON(userJSONList)
	{
		ScoreManager._sharedInstance.userCache = new Array();

		let users = userJSONList;

		console.log(userJSONList);

		for (let i = 0; i < users.length; i++)
		{
			console.log(users[i].score);

			ScoreManager._sharedInstance.userCache.push(users[i]);
		}

		console.log(ScoreManager._sharedInstance.userCache);
	}

	getNTopEntries(numOfRanks) {
		let rankedUsers = new Array();
		let cacheSize = ScoreManager._sharedInstance.userCache.length;
		let lastHighScore = 999999999;
		let currentHighScore = -9999999999;
		let currentIndex = 0;

		console.log(cacheSize);

		for(let i = 0; i < numOfRanks; i++)
		{
			if (i >= cacheSize)
				break;

			for(let j = 0; j < cacheSize; j++)
			{
				let user = this.userCache[j];
				if (user.score > currentHighScore){
					if (user.score < lastHighScore){
						currentHighScore = user.score;
						currentIndex = j;
					}
					else if(user.score == lastHighScore){
						let isPartOfLeaderboard = false;
						for(let k = 0; k < rankedUsers.length; k++){
							if (user.id == rankedUsers[k].id){
								isPartOfLeaderboard = true;
								break;
							}
						}

						if (!isPartOfLeaderboard){
							currentHighScore = user.score;
							currentIndex = j;
						}
					}	
				}
			}

			console.log(currentIndex);
			rankedUsers.push(this.userCache[currentIndex]);
			
			lastHighScore = currentHighScore;
			currentHighScore = -99999999;
			currentIndex = 0;
		}

		console.log(rankedUsers);
	}

	printAllUsers()
	{
		console.log(ScoreManager._sharedInstance.userCache);

		for (let j = 0; j < ScoreManager._sharedInstance.userCache.length; j++)
		{
			console.log(ScoreManager._sharedInstance.userCache[j].name);
		}
	}




}