"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpTestScene = function (_cc$Scene) {
    _inherits(HttpTestScene, _cc$Scene);

    function HttpTestScene() {
        _classCallCheck(this, HttpTestScene);

        return _possibleConstructorReturn(this, (HttpTestScene.__proto__ || Object.getPrototypeOf(HttpTestScene)).call(this));
    }

    _createClass(HttpTestScene, [{
        key: "onEnter",
        value: function onEnter() {
            _get(HttpTestScene.prototype.__proto__ || Object.getPrototypeOf(HttpTestScene.prototype), "onEnter", this).call(this);
            /*  BackendRequest.Get(`http://localhost:3000/ping`).then((resp) => {
                  console.log(resp)
              }).catch((err) => {
                  console.log(err)
              })*/
            this.userCalls();
        }
    }, {
        key: "userCalls",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log("POST /users");
                                _context.next = 3;
                                return UserApi.CreateUser({ name: 'test' });

                            case 3:
                                user = _context.sent;

                                console.log(user);

                                console.log("PATCH /users/:id");
                                _context.next = 8;
                                return UserApi.PatchUser(user.id, { last_name: "test_last" });

                            case 8:

                                console.log("PUT /users/:id");
                                user.name = "new_name";
                                _context.next = 12;
                                return UserApi.UpdateUser(user.id, user);

                            case 12:
                                user = _context.sent;

                                console.log(user);

                                console.log("GET /users/:id");
                                _context.next = 17;
                                return UserApi.GetUser(user.id);

                            case 17:
                                user = _context.sent;


                                console.log("DELETE /users/:id");
                                _context.next = 21;
                                return UserApi.DeleteUser(user.id).then(function (resp) {
                                    console.log(resp);
                                });

                            case 21:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function userCalls() {
                return _ref.apply(this, arguments);
            }

            return userCalls;
        }()
    }]);

    return HttpTestScene;
}(cc.Scene);