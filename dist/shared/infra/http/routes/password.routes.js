"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResertPasswordUserController = require("../../../../modules/accounts/useCases/resetPasswordUser/ResertPasswordUserController");

var _SendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPassowrdMailController();
const resetPasswordUserController = new _ResertPasswordUserController.ResetPasswordUserController();
passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);