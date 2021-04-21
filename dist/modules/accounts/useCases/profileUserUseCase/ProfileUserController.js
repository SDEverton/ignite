"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUsecase = require("./ProfileUserUsecase");

class ProfileUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const profileUserUseCase = _tsyringe.container.resolve(_ProfileUserUsecase.ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id);
    return response.json(user);
  }

}

exports.ProfileUserController = ProfileUserController;