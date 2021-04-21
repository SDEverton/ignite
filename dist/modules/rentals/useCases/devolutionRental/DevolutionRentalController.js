"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionRentalController {
  async handle(requenst, response) {
    const {
      id: user_id
    } = requenst.user;
    const {
      id
    } = requenst.params;

    const devolutionRentalUseCase = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id
    });
    return response.status(200).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;