"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackendRequest = function () {
    function BackendRequest() {
        _classCallCheck(this, BackendRequest);
    }

    _createClass(BackendRequest, null, [{
        key: "_generateRequest",
        value: function _generateRequest(method, url, resolve, reject) {
            var request = cc.loader.getXMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var result = {};
                    if (request.status >= 200 && request.status < 400) {
                        result.status = request.status;
                        if (request.status != 204) {
                            result.body = JSON.parse(request.response);
                        }
                        resolve(result);
                    } else {
                        result.status = request.status;
                        result.body = request.response;
                        reject(result);
                    }
                }
            };
            return request;
        }
    }, {
        key: "Get",
        value: function Get(url) {
            var getPromise = new Promise(function (resolve, reject) {
                var request = BackendRequest._generateRequest("GET", url, resolve, reject);
                request.send();
            });

            return getPromise;
        }
    }, {
        key: "Post",
        value: function Post(url, request_body) {
            var postPromise = new Promise(function (resolve, reject) {
                var request = BackendRequest._generateRequest("POST", url, resolve, reject);
                request.send(JSON.stringify(request_body));
            });

            return postPromise;
        }
    }, {
        key: "Patch",
        value: function Patch(url, request_body) {
            var patchPromise = new Promise(function (resolve, reject) {
                var request = BackendRequest._generateRequest("PATCH", url, resolve, reject);
                request.send(JSON.stringify(request_body));
            });

            return patchPromise;
        }
    }, {
        key: "Put",
        value: function Put(url, request_body) {
            var putPromise = new Promise(function (resolve, reject) {
                var request = BackendRequest._generateRequest("PUT", url, resolve, reject);
                request.send(JSON.stringify(request_body));
            });

            return putPromise;
        }
    }, {
        key: "Delete",
        value: function Delete(url) {
            var deletePromise = new Promise(function (resolve, reject) {
                var request = BackendRequest._generateRequest("DELETE", url, resolve, reject);
                request.send();
            });

            return deletePromise;
        }
    }]);

    return BackendRequest;
}();