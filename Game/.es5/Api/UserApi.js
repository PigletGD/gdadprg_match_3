"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_URL = "http://localhost:3000/users/";

var UserApi = function () {
    function UserApi() {
        _classCallCheck(this, UserApi);
    }

    _createClass(UserApi, null, [{
        key: "CreateUser",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(new_user) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt("return", BackendRequest.Post("" + BASE_URL, { user: new_user }).then(function (resp) {
                                    console.log(resp);
                                    return resp.body.user;
                                }).catch(function (e) {
                                    console.log(e);
                                }));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function CreateUser(_x) {
                return _ref.apply(this, arguments);
            }

            return CreateUser;
        }()
    }, {
        key: "PatchUser",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, changes) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt("return", BackendRequest.Patch("" + BASE_URL + id, { user: changes }));

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function PatchUser(_x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return PatchUser;
        }()
    }, {
        key: "UpdateUser",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, updates) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt("return", BackendRequest.Put("" + BASE_URL + id, { user: updates }).then(function (resp) {
                                    return resp.body.user;
                                }));

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function UpdateUser(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return UpdateUser;
        }()
    }, {
        key: "GetUser",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt("return", BackendRequest.Get("" + BASE_URL + id).then(function (resp) {
                                    return resp.body.user;
                                }));

                            case 1:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function GetUser(_x6) {
                return _ref4.apply(this, arguments);
            }

            return GetUser;
        }()
    }, {
        key: "DeleteUser",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt("return", BackendRequest.Delete("" + BASE_URL + id));

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function DeleteUser(_x7) {
                return _ref5.apply(this, arguments);
            }

            return DeleteUser;
        }()
    }, {
        key: "GetAllUsers",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                return _context6.abrupt("return", BackendRequest.Get("" + BASE_URL).then(function (resp) {
                                    return resp.body;
                                }).catch(function (e) {
                                    console.log(e);
                                }));

                            case 1:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function GetAllUsers() {
                return _ref6.apply(this, arguments);
            }

            return GetAllUsers;
        }()
    }]);

    return UserApi;
}();