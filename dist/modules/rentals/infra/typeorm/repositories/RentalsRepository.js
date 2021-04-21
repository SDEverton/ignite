"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    });
    return this.repository.save(rental);
  }

  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id) {
    const rental = await this.repository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return rental;
  }

}

exports.RentalRepository = RentalRepository;