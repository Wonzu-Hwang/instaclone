"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

var _default = {
  Mutation: {
    followUser: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var username, loggedInUser, ok;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].user.findUnique({
                  where: {
                    username: username
                  }
                });

              case 4:
                ok = _context.sent;
                _context.prev = 5;

                if (ok) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "That user does not exist"
                });

              case 8:
                _context.next = 10;
                return _client["default"].user.update({
                  where: {
                    id: loggedInUser.id
                  },
                  data: {
                    following: {
                      connect: {
                        username: username
                      }
                    }
                  }
                });

              case 10:
                return _context.abrupt("return", {
                  ok: true
                });

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                console.log(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 13]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;