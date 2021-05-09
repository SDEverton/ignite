import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IAddressRepository } from '@modules/accounts/repositories/IAddressRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AddressRepository')
    private addressRepository: IAddressRepository
  ) {}
  async execute({
    name,
    email,
    password,
    driver_licence,
    cpf,
    birth,
    phone_number,
    address,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadExists = await this.usersRepository.findByEmail(email);

    if (userAlreadExists) {
      throw new AppError('User already exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_licence,
      cpf,
      birth,
      phone_number,
    });

    await this.addressRepository.create({
      user_id: user.id,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      zipcode: address.zipcode,
      city: address.city,
      state: address.state,
    });
  }
}

export { CreateUserUseCase };
