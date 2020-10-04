"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameLayerResizerAnchorLeft = function (_ResizeListener) {
    _inherits(GameLayerResizerAnchorLeft, _ResizeListener);

    function GameLayerResizerAnchorLeft(padding) {
        _classCallCheck(this, GameLayerResizerAnchorLeft);

        var _this = _possibleConstructorReturn(this, (GameLayerResizerAnchorLeft.__proto__ || Object.getPrototypeOf(GameLayerResizerAnchorLeft)).call(this));

        _this.padding = padding;
        _this.setName("GameLayerResizerAnchorLeft");
        return _this;
    }

    _createClass(GameLayerResizerAnchorLeft, [{
        key: "onEnter",
        value: function onEnter() {
            _get(GameLayerResizerAnchorLeft.prototype.__proto__ || Object.getPrototypeOf(GameLayerResizerAnchorLeft.prototype), "onEnter", this).call(this);
            this.onResize();
        }
    }, {
        key: "onResize",
        value: function onResize() {
            var owner = this.getOwner();
            var ownerSize = owner.getContentSize();

            owner.y = cc.winSize.height / 2 - owner.height / 2;

            // Checks target scale between horizontal and axis
            var scaleX = (cc.winSize.width - this.padding) / ownerSize.width;
            var scaleY = (cc.winSize.height - this.padding) / ownerSize.height;

            var targetScale = 1;

            // Checks which scale is greater
            if (scaleX < scaleY) {
                // Game layer is anchored to middle if on portrait mode
                owner.setAnchorPoint(0.5, 0.5);
                owner.x = cc.winSize.width / 2 - owner.width / 2;
                targetScale = scaleX;
            } else {
                // Game layer is anchored to the left if on landscape mode
                owner.setAnchorPoint(0.0, 0.5);
                owner.setAnchorPoint;
                owner.x = this.padding / 5;
                targetScale = scaleY;
            }

            owner.setScale(targetScale);
            this.isResizeContent = false;
        }
    }]);

    return GameLayerResizerAnchorLeft;
}(ResizeListener);