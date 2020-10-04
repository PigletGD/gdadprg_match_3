'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
    function UserService() {
        _classCallCheck(this, UserService);
    }

    _createClass(UserService, [{
        key: 'createUser',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, score) {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return UserApi.CreateUser({ name: name, score: score }).then(function (newUser) {
                                    console.log(newUser.id);
                                    cc.sys.localStorage.setItem('current_user_id', newUser.id);
                                    _this.currentUser = newUser;
                                    return _this.currentUser;
                                });

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function createUser(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return createUser;
        }()
    }, {
        key: 'getAllUsersInfo',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return UserApi.GetAllUsers().then(function (userList) {
                                    ScoreManager.getInstance().loadUserScoresFromJSON(userList);
                                    return userList;

                                    // for (let i = 0; i < userList.length; i++){
                                    //     console.log(userList[i]);
                                    // }
                                });

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getAllUsersInfo() {
                return _ref2.apply(this, arguments);
            }

            return getAllUsersInfo;
        }()
    }, {
        key: 'getLeaderboardRankings',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return UserApi.GetUserRankings().then(function (rankings) {
                                    console.log(rankings.length);

                                    for (var i = 0; i < rankings.length; i++) {
                                        console.log(rankings[i]);
                                    }
                                });

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getLeaderboardRankings() {
                return _ref3.apply(this, arguments);
            }

            return getLeaderboardRankings;
        }()
    }, {
        key: 'loadUser',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this2 = this;

                var userId;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                userId = undefined;


                                if (this.currentUser) {
                                    userId = this.currentUser.id;
                                } else {
                                    userId = cc.sys.localStorage.getItem('current_user_id');
                                }

                                console.log(userId);

                                if (!(userId == undefined)) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt('return', Promise.reject(new Error("NotExisting")));

                            case 5:
                                _context4.next = 7;
                                return UserApi.GetUser(userId).then(function (loadedUser) {
                                    _this2.currentUser = loadedUser;
                                    return _this2.currentUser;
                                });

                            case 7:
                                return _context4.abrupt('return', _context4.sent);

                            case 8:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function loadUser() {
                return _ref4.apply(this, arguments);
            }

            return loadUser;
        }()
    }], [{
        key: 'getInstance',
        value: function getInstance() {
            if (UserService._sharedInstance == undefined) {
                UserService._sharedInstance = new UserService();
            }

            return UserService._sharedInstance;
        }
    }]);

    return UserService;
}();