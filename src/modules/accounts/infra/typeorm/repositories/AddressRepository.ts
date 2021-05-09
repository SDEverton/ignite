import { getRepository, Repository } from 'typeorm';

import { ICreateAddressDTO } from '@modules/accounts/dtos/ICreateAddressDTO';
import { IAddressRepository } from '@modules/accounts/repositories/IAddressRepository';

import { Address } from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

  async create({
    neighborhood,
    number,
    city,
    state,
    street,
    user_id,
    zipcode,
  }: ICreateAddressDTO): Promise<void> {
    const address = this.repository.create({
      neighborhood,
      number,
      city,
      state,
      street,
      user_id,
      zipcode,
    });

    await this.repository.save(address);
  }
}

export { AddressRepository };
