"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsDateProvider;
let carsRepositoryInMemory;
describe('Create Rental', () => {
  const dayAdd24hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayJsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Test car',
      daily_rate: 100,
      license_plate: '12345',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '21',
      expected_return_date: dayAdd24hours,
      user_id: '12345'
    });
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '21123213',
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError('There s a rental in progress for user!'));
  });
  it('should be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: '123',
      car_id: 'test123',
      expected_return_date: dayAdd24hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '321',
      car_id: 'test123',
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '123',
      car_id: 'test12',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time!'));
  });
});