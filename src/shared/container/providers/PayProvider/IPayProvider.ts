import { IPayProviderDTO } from './dtos/IPayProviderDTO';
import { IResponseProviderDTO } from './dtos/IPayProviderResponseDTO';

interface IPayProvider {
  createPayConventional(data: IPayProviderDTO): Promise<IResponseProviderDTO>;
  createPayPix(data: IPayProviderDTO): Promise<IResponseProviderDTO>;
}

export { IPayProvider };
