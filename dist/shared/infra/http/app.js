"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

require("../../container");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var Tracing = _interopRequireWildcard(require("@sentry/tracing"));

var _AppError = require("../../errors/AppError");

var _rateLimiter = _interopRequireDefault(require("./middleware/rateLimiter"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = require("./routes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use(_rateLimiter.default);
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({
    tracing: true
  }), new Tracing.Integrations.Express({
    app
  })],
  tracesSampleRate: 1.0
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(_express.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/cars', _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use((0, _cors.default)());
app.use(_routes.router);
app.use(Sentry.Handlers.errorHandler());
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});