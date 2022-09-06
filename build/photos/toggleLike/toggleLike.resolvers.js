"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _default = {
  Mutation: {
    toggleLike: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser, photo, like;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].photo.findUnique({
                  where: {
                    id: id
                  }
                });

              case 4:
                photo = _context.sent;

                if (photo) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Photo not found"
                });

              case 7:
                _context.next = 9;
                return _client["default"].like.findUnique({
                  where: {
                    photoId_userId: {
                      userId: loggedInUser.id,
                      photoId: id
                    }
                  }
                });

              case 9:
                like = _context.sent;

                if (!like) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return _client["default"].like["delete"]({
                  where: {
                    photoId_userId: {
                      userId: loggedInUser.id,
                      photoId: id
                    }
                  }
                });

              case 13:
                _context.next = 17;
                break;

              case 15:
                _context.next = 17;
                return _client["default"].like.create({
                  data: {
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    },
                    photo: {
                      connect: {
                        id: photo.id
                      }
                    }
                  }
                });

              case 17:
                return _context.abrupt("return", {
                  ok: true
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;