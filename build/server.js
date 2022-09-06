"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireWildcard(require("http"));

var _morgan = _interopRequireDefault(require("morgan"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlUpload = require("graphql-upload");

var _subscriptionsTransportWs = require("subscriptions-transport-ws");

var _graphql = require("graphql");

var _schema = require("@graphql-tools/schema");

var _schema2 = require("./schema");

var _users = require("./users/users.utils");

var _apolloServerCore = require("apollo-server-core");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

require("dotenv").config();

var schema = (0, _schema.makeExecutableSchema)({
  typeDefs: _schema2.typeDefs,
  resolvers: _schema2.resolvers
});

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var apollo, app, httpServer, subscriptionServer, PORT;
    return _regenerator["default"].wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            apollo = new _apolloServerExpress.ApolloServer({
              schema: schema,
              context: function () {
                var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
                  var req, _req$headers, loggedInUser;

                  return _regenerator["default"].wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          req = _ref.req;

                          if (!req) {
                            _context2.next = 8;
                            break;
                          }

                          _context2.next = 4;
                          return (0, _users.getUser)(req === null || req === void 0 ? void 0 : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.token);

                        case 4:
                          loggedInUser = _context2.sent;

                          if (!(loggedInUser === null)) {
                            _context2.next = 7;
                            break;
                          }

                          return _context2.abrupt("return", null);

                        case 7:
                          return _context2.abrupt("return", {
                            loggedInUser: loggedInUser
                          });

                        case 8:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                }));

                function context(_x) {
                  return _context.apply(this, arguments);
                }

                return context;
              }(),
              plugins: [{
                serverWillStart: function serverWillStart() {
                  return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                    return _regenerator["default"].wrap(function _callee3$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt("return", {
                              drainServer: function drainServer() {
                                return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                                  return _regenerator["default"].wrap(function _callee2$(_context3) {
                                    while (1) {
                                      switch (_context3.prev = _context3.next) {
                                        case 0:
                                          subscriptionServer.close();

                                        case 1:
                                        case "end":
                                          return _context3.stop();
                                      }
                                    }
                                  }, _callee2);
                                }))();
                              }
                            });

                          case 1:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee3);
                  }))();
                }
              }],
              subscriptions: {
                onConnect: function onConnect(param) {
                  console.log(param);
                }
              }
            });
            _context6.next = 3;
            return apollo.start();

          case 3:
            app = (0, _express["default"])();
            app.use((0, _morgan["default"])("tiny"));
            app.use("/static", _express["default"]["static"]("uploads"));
            app.use((0, _graphqlUpload.graphqlUploadExpress)());
            apollo.applyMiddleware({
              app: app
            });
            httpServer = _http["default"].createServer(app);
            subscriptionServer = _subscriptionsTransportWs.SubscriptionServer.create({
              schema: schema,
              execute: _graphql.execute,
              subscribe: _graphql.subscribe,
              onConnect: function onConnect(connectionParams, webSocket, context) {
                return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
                  var token, loggedInUser;
                  return _regenerator["default"].wrap(function _callee4$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          console.log("onConnect!");
                          token = connectionParams.token;

                          if (token) {
                            _context5.next = 4;
                            break;
                          }

                          throw new Error("token don't exist");

                        case 4:
                          _context5.next = 6;
                          return (0, _users.getUser)(token);

                        case 6:
                          loggedInUser = _context5.sent;
                          return _context5.abrupt("return", {
                            loggedInUser: loggedInUser
                          });

                        case 8:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee4);
                }))();
              },
              onDisconnect: function onDisconnect(webSocket, context) {
                console.log("onDisconnect!");
              }
            }, {
              server: httpServer,
              path: "/graphql"
            });
            PORT = process.env.PORT;
            _context6.next = 13;
            return new Promise(function (resolve) {
              return httpServer.listen(PORT, resolve);
            });

          case 13:
            console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(PORT).concat(apollo.graphqlPath));

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5);
  }));
  return _startServer.apply(this, arguments);
}

startServer();