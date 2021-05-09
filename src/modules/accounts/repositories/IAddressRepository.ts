import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';

interface IAddressRepository {
  create(data: ICreateAddressDTO): Promise<void>;
}

export { IAddressRepository };
