"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPassowrdMailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

class SendForgotPassowrdMailController {
  async handle(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordMailUseCase = _tsyringe.container.resolve(_SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);
    return response.send();
  }

}

exports.SendForgotPassowrdMailController = SendForgotPassowrdMailController;