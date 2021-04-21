"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  async handle(request, response) {
    const {
      car_id,
      expected_return_date
    } = request.body;
    const {
      id
    } = request.user;

    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id: id
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;