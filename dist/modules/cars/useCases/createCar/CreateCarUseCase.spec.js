"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it('shold be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
      brand: 'Brand'
    });
    expect(car).toHaveProperty('id');
  });
  it('shold not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
      brand: 'Brand'
    });
    await expect(createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
      brand: 'Brand'
    })).rejects.toEqual(new _AppError.AppError('Car already exists!'));
  });
  it('shold be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-2234',
      fine_amount: 60,
      category_id: 'category',
      brand: 'Brand'
    });
    expect(car.available).toBe(true);
  });
});