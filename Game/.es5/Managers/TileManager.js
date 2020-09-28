"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileManager = function () {
	function TileManager() {
		_classCallCheck(this, TileManager);
	}

	_createClass(TileManager, [{
		key: "addTileType",
		value: function addTileType(tile) {
			this._tileTypes.push(tile);
		}
	}, {
		key: "getRandomTileType",
		value: function getRandomTileType() {}
	}], [{
		key: "getInstance",
		value: function getInstance() {
			if (GameManager._sharedInstance == undefined) {
				GameManager._sharedInstance = new GameManager();
			}

			return GameManager._sharedInstance;
		}
	}]);

	return TileManager;
}();