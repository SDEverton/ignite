"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Tesrdk',
      description: 'Descrição',
      daily_rate: 140.0,
      license_plate: '124956',
      fine_amount: 100,
      brand: 'Novoo',
      category_id: 'a6b1f9b1-b496-40cf-bdf0-f1f8c45ef6a9'
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Novo',
      description: 'Descrição',
      daily_rate: 140.0,
      license_plate: '1249567',
      fine_amount: 100,
      brand: 'Novooiaaa',
      category_id: 'a6b1f9b1-b496-40cf-bdf0-f1f8c45ef6a9'
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Novooiaaa'
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Novooiaaa',
      description: 'Descrição',
      daily_rate: 140.0,
      license_plate: '1249567',
      fine_amount: 100,
      brand: 'Novo',
      category_id: 'a6b1f9b1-b496-40cf-bdf0-f1f8c45ef6a9'
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Novooiaaa'
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Novooiaaa',
      description: 'Descrição',
      daily_rate: 140.0,
      license_plate: '1249567',
      fine_amount: 100,
      brand: 'Novo',
      category_id: 'a6b1f9b1-b496-40cf-bdf0-f1f8c45ef6a9'
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'a6b1f9b1-b496-40cf-bdf0-f1f8c45ef6a9'
    });
    expect(cars).toEqual([car]);
  });
});