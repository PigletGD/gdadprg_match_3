class User{
    constructor({name = '', score = '', id = ''}){
        this.name = name;
        this.score = score;
        this.id = id;
    }
}

module.exports = User;