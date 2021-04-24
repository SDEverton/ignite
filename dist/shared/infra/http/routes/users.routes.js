"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRouter = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUserUseCase/ProfileUserController");

var _UpdateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
exports.usersRouter = usersRouter;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRouter.post('/', createUserController.handle);
usersRouter.use(_ensureAuthenticated.ensureAuthenticated);
usersRouter.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarController.handle);
usersRouter.get('/profile', profileUserController.handle);