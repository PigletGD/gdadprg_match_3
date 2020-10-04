"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainMenuLayer = function (_cc$LayerColor) {
	_inherits(MainMenuLayer, _cc$LayerColor);

	function MainMenuLayer() {
		_classCallCheck(this, MainMenuLayer);

		return _possibleConstructorReturn(this, (MainMenuLayer.__proto__ || Object.getPrototypeOf(MainMenuLayer)).call(this));
	}

	_createClass(MainMenuLayer, [{
		key: "onEnter",
		value: function onEnter() {
			_get(MainMenuLayer.prototype.__proto__ || Object.getPrototypeOf(MainMenuLayer.prototype), "onEnter", this).call(this);
			this.scheduleUpdate();

			this.test();

			var titleBackground = new Background("TitleBackground", res.TitleBackground_png);
			this.addChild(titleBackground);

			var titleLandscapeLayout = new MainMenuLandscapeLayout();
			titleLandscapeLayout.setName("MainMenuLandscapeLayout");
			this.addChild(titleLandscapeLayout);

			var titlePortraitLayout = new MainMenuPortraitLayout();
			titlePortraitLayout.setName("MainMenuPortraitLayout");
			this.addChild(titlePortraitLayout);
		}
	}, {
		key: "test",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return UserService.getInstance().getAllUsersInfo().then(function (users) {
									console.log(users.users.length);
									for (var i = 0; i < users.users.length; i++) {
										console.log(users.users[i]);
									}
								});

							case 2:
								return _context.abrupt("return", _context.sent);

							case 3:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function test() {
				return _ref.apply(this, arguments);
			}

			return test;
		}()
	}]);

	return MainMenuLayer;
}(cc.LayerColor);