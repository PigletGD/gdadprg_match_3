class UserService
{
    static getInstance()
    {
        if (UserService._sharedInstance == undefined)
        {
            UserService._sharedInstance = new UserService();
        }

        return UserService._sharedInstance;
    }

    async createUser(name, score)
    {
        return await UserApi.CreateUser({name: name, score: score})
            .then((newUser) =>
            {
                console.log(newUser.id);
                cc.sys.localStorage.setItem('current_user_id', newUser.id);
                this.currentUser = newUser;
                return this.currentUser;
            });
    }

    async getAllUsersInfo()
    {
        return await UserApi.GetAllUsers()
            .then((userList) =>
            {
                // Sends all user info to the score manager to load rankings
                ScoreManager.getInstance().loadUserScoresFromJSON(userList.users, this.currentUser.id);
                return userList;
            });
    }

    // Patches the score value of the current user
    async updateScore(score)
    {
        return await UserApi.PatchUser(this.currentUser.id, {score: score})
            .then((resp) =>
            {
                console.log(resp);
            });
    }

    async loadUser()
    {
        let userId = undefined;

        if (this.currentUser)
        {
            userId = this.currentUser.id;
        }
        else
        {
            userId = cc.sys.localStorage.getItem('current_user_id');
        }

        console.log(userId);
        if (userId == undefined)
        {
            return Promise.reject(new Error("NotExisting"));
        }

        return await UserApi.GetUser(userId).then((loadedUser) =>
        {
            this.currentUser = loadedUser;
            return this.currentUser;
        });
    }
}