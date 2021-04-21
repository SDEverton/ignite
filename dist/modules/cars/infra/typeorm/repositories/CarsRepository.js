"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });
    return car;
  }

  async findAvailable(brand, category_id, name) {
    const carsQuery = this.repository.createQueryBuilder('c').where('available = :available', {
      available: true
    });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where('id = :id').setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;