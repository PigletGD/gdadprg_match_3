"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: BoardManager
// It creates a board.
// It handles creating additional tiles when a match is found.
// It stores all the tile types to be generated as tiles
// OPTIONAL: Create a certain board type.
// OPTIONAL: Shuffle when no match can be found.

/*
var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
*/
var instance = null;

var BoardManager = function () {
	function BoardManager() {
		_classCallCheck(this, BoardManager);

		if (!instance) {
			instance = this;
		}

		return instance;
	}

	_createClass(BoardManager, [{
		key: "getInstance",
		value: function getInstance() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	}, {
		key: "createBoard",
		value: function createBoard() {
			var board = new Board("Board", cc.size(8, 7), cc.size(64, 64));
			board.x = this.getContentSize().width / 2 - board.width / 2;
			board.y = this.getContentSize().height / 2 - board.height / 2;

			return board;
		}
	}]);

	return BoardManager;
}();

/*
var BoardManager = (function()
{
	var instance;

	function createInstance()
	{
		var object = new Object("I am the instance");
		return object;
	}

	return {


		 createBoard: function()
		{
			let board = new Board("Board", cc.size(8, 7), cc.size(64, 64));
			board.x = this.getContentSize().width / 2 - board.width / 2;
			board.y = this.getContentSize().height / 2 - board.height / 2;

			return board;
		}
	};


})();
*/

// console.log(BoardManager);

/*
{
	createBoard()
	{
		let board = new Board("Board", cc.size(8, 7), cc.size(64, 64));
		board.x = this.getContentSize().width / 2 - board.width / 2;
		board.y = this.getContentSize().height / 2 - board.height / 2;
	}
}
*/