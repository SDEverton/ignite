"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UserRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_licence: '970659026',
      email: 'hulad@veklir.py',
      name: 'Helena Bryant',
      password: '1234'
    });
    await sendForgotPasswordMailUseCase.execute('hulad@veklir.py');
    expect(sendMail).toHaveBeenCalled();
  });
  it('Should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('os@nu.ch')).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('Should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      driver_licence: '91189576',
      email: 'vum@rek.in',
      name: 'Martha Simpson',
      password: '1234'
    });
    await sendForgotPasswordMailUseCase.execute('vum@rek.in');
    expect(generateTokenMail).toBeCalled();
  });
});