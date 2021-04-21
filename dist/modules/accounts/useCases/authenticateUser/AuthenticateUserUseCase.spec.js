"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dateProvider;
describe('Autheticate User', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UserRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      driver_licence: '32792379',
      email: 'everton@gmail.com',
      password: '1234',
      name: 'User test'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'nao@gmail.com',
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      driver_licence: '32792379',
      email: 'everton@gmail.com',
      password: '1234',
      name: 'User test'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: '12345'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
  });
});