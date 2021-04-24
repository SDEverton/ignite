"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("../../repositories/in-memory/SpecificationRepositoryInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationRepositoryInMemory;
describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
  });
  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '123';
    const specification_id = ['23233423'];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specification_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exists!'));
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'category',
      brand: 'Brand'
    });
    const specification = await specificationRepositoryInMemory.create({
      description: 'teste',
      name: 'teste'
    });
    const specification_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id
    });
    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
  });
});