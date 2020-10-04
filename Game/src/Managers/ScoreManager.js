class ScoreManager
{
	static getInstance()
	{
		if (ScoreManager._sharedInstance == undefined)
		{
			ScoreManager._sharedInstance = new ScoreManager();
			ScoreManager._sharedInstance.userCache = new Array();
			ScoreManager._sharedInstance.scoreCache = new Array();
			ScoreManager._sharedInstance.rankCache = new Array();
		}

		return ScoreManager._sharedInstance;
	}

	loadUserScoresFromJSON(userJSONList, userID)
	{
		ScoreManager._sharedInstance.userCache = new Array();

		let users = userJSONList;

		for (let i = 0; i < users.length; i++)
		{
			// Goes through each user in the database and pushes it to the score manager for caching
			ScoreManager._sharedInstance.userCache.push(users[i]);
		}

		// Loads top ranked entries and the user placement in the leaderboard
		ScoreManager._sharedInstance.rankCache = ScoreManager._sharedInstance.getNTopEntries(5, userID);
	}

	getNTopEntries(numOfRanks, userID) {
		let rankedUsers = new Array();
		let cacheSize = ScoreManager._sharedInstance.userCache.length;
		
		// Initial values for placements
		let lastHighScore = 999999999;
		let currentHighScore = -9999999999;
		let currentIndex = 0;

		for(let i = 0; i < numOfRanks; i++)
		{
			// Breaks out of the loop if desired rank placements
			// are greater than the number of users in database
			if (i >= cacheSize){
				break;
			}

			// Cycle through each user
			for(let j = 0; j < cacheSize; j++)
			{
				// Get user info
				let user = this.userCache[j];
				let userScore = parseInt(user.score);

				if (userScore > currentHighScore){
					if (userScore < lastHighScore){
						currentHighScore = userScore;
						currentIndex = j;
					}
					else if(userScore === lastHighScore){
						// This check is to see if the user gotten already is
						// marked in the leaderboard
						let isPartOfLeaderboard = false;
						for(let k = 0; k < rankedUsers.length; k++){
							if (user.id === rankedUsers[k].id){
								isPartOfLeaderboard = true;
								break;
							}
						}

						if (!isPartOfLeaderboard){
							// Adds as a potential ranked player in leaderboard
							currentHighScore = userScore;
							currentIndex = j;
						}
					}	
				}
			}

			// Pushes the highest valued person found in the list in the leaderboard
			rankedUsers.push(this.userCache[currentIndex]);

			lastHighScore = currentHighScore;
			currentHighScore = -99999999;
			currentIndex = 0;
		}

		ScoreManager._sharedInstance.playerRank = ScoreManager._sharedInstance.getUserRanking(userID, rankedUsers);
		return rankedUsers;
	}

	getUserRanking(userID, rankedUsers) {
		let initialRank = 1;
		let cacheSize = ScoreManager._sharedInstance.userCache.length;
		// Initial player info
		let playerIndex = 0;
		let playerUser;
		let playerUserScore;

		console.log(rankedUsers);

		for(let i = 0; i < rankedUsers.length; i++){
			if (userID == rankedUsers[i].id) {
				return {"rank" : i + 1, "name" : rankedUsers[i].name, "score" : rankedUsers[i].score};
			}
		}

		for(let i = 0; i < cacheSize; i++){
			// Find user in the cache
			if (userID == this.userCache[i].id){
				playerUser = this.userCache[i];
				playerIndex = i;
				break;
			}
		}

		

		// Parse json data into int
		playerUserScore = parseInt(playerUser.score);


		for(let j = 0; j < cacheSize; j++)
		{
			// Checks and see if there is a player ranked above the player
			if (playerIndex != j){
				let user = this.userCache[j];
				let userScore = parseInt(user.score);

				if (userScore >= playerUserScore){
					// Demotes the rank of the player
					initialRank++;
				}
			}
		}

		return {"rank" : initialRank, "name" : playerUser.name, "score" : playerUser.score};
	}

	printAllUsers()
	{
		console.log(ScoreManager._sharedInstance.userCache);

		for (let j = 0; j < ScoreManager._sharedInstance.userCache.length; j++)
		{
			console.log(ScoreManager._sharedInstance.userCache[j].name);
		}
	}

	get orderedRanks(){
		return ScoreManager._sharedInstance.rankCache;
	}

	get playerInfo() {
		return ScoreManager._sharedInstance.playerRank;
	}
}