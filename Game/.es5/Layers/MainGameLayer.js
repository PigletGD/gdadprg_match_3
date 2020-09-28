"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Fox [ause pop-up can be spawned more than once (Pause button can be pressed as well as tiles when paused)


var MainGameLayer = function (_cc$LayerColor) {
    _inherits(MainGameLayer, _cc$LayerColor);

    function MainGameLayer() {
        _classCallCheck(this, MainGameLayer);

        var _this = _possibleConstructorReturn(this, (MainGameLayer.__proto__ || Object.getPrototypeOf(MainGameLayer)).call(this, cc.color(0, 100, 0, 255), 800, 700));

        _this.setAnchorPoint(0.5, 0.5);
        _this.board;
        return _this;
    }

    _createClass(MainGameLayer, [{
        key: "onEnter",
        value: function onEnter() {
            _get(MainGameLayer.prototype.__proto__ || Object.getPrototypeOf(MainGameLayer.prototype), "onEnter", this).call(this);
            this.scheduleUpdate();
            this.addComponent(new GameLayerResizerAnchorLeft(60));
            this.createBoard();
        }

        // Test function as I couldn't get board manager to work

    }, {
        key: "createBoard",
        value: function createBoard() {
            var tileTypes = new Array();

            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ffff00")));
            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff00ff")));
            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ffff")));
            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#ff0000")));
            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#0000ff")));
            tileTypes.push(new Tile(res.PrototypeSprite, 0, 0, cc.color("#00ff00")));

            var contentSize = this.getContentSize();

            this.board = new Board("Board", cc.size(8, 8), cc.size(contentSize.width / 8, contentSize.height / 8));

            for (var row = 0; row < this.board.boardSize.height; row++) {
                for (var col = 0; col < this.board.boardSize.width; col++) {
                    var tile = tileTypes[getRandomInt(0, tileTypes.length - 1)];
                    this.board.addTile(tile, col, row);
                }
            }

            this.board.addComponent(new FitToParent());

            this.addChild(this.board);
        }
    }]);

    return MainGameLayer;
}(cc.LayerColor);