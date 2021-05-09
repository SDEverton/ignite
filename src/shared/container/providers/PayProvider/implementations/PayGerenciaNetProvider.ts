import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { authenticate, agent } from '@config/payPix';
import { gerencianet } from '@config/paySDK';
import { AppError } from '@shared/errors/AppError';

import { IPayProviderDTO } from '../dtos/IPayProviderDTO';
import { IResponseProviderDTO } from '../dtos/IPayProviderResponseDTO';
import { IPayProvider } from '../IPayProvider';

class PayGerenciaNetProvider implements IPayProvider {
  http: AxiosInstance;

  async init(access_token: string): Promise<void> {
    console.log(access_token);
    const config: AxiosRequestConfig = {
      baseURL: process.env.GERENCIA_URL,
      httpsAgent: agent,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    this.http = axios.create(config);
  }

  async createPayConventional({
    total,
    user,
    description,
    installments,
    payment_token,
    date,
  }: IPayProviderDTO): Promise<IResponseProviderDTO> {
    const bankingBillet = {
      payment: {
        banking_billet: {
          expire_at: date,
          customer: {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone_number: user.phone_number,
          },
        },
      },
      items: [
        {
          name: description,
          value: Number(total.toFixed(2).replace(/[^\d]+/g, '')),
          amount: 1,
        },
      ],
    };

    const credCard = {
      payment: {
        credit_card: {
          installments,
          payment_token,
          billing_address: {
            street: user.address.street,
            number: user.address.number,
            neighborhood: user.address.neighborhood,
            zipcode: user.address.zipcode,
            city: user.address.city,
            state: user.address.state,
          },
          customer: {
            name: user.name,
            email: user.email,
            birth: user.birth,
            cpf: user.cpf,
            phone_number: user.phone_number,
          },
        },
      },
      items: [
        {
          name: description,
          value: Number(total.toFixed(2).replace(/[^\d]+/g, '')),
          amount: 1,
        },
      ],
    };
    try {
      const response: IResponseProviderDTO = await gerencianet.oneStep(
        [],
        installments !== undefined ? credCard : bankingBillet
      );
      console.log(response);

      return response;
    } catch (error) {
      throw new AppError(`${error.error_description.message}`, 404);
    }
  }

  async createPayPix({
    total,
    user,
    description,
    rental_id,
  }: IPayProviderDTO): Promise<IResponseProviderDTO> {
    const {
      data: { access_token },
    } = await authenticate();

    await this.init(access_token);
    try {
      console.log({
        calendario: {
          expiracao: 3600,
        },
        devedor: {
          cpf: user.cpf,
          nome: user.name,
        },
        valor: {
          original: `${total.toFixed(2)}`,
        },
        chave: rental_id,
        solicitacaoPagador: description,
      });
      const test = await this.http.post('v2/cob', {
        calendario: {
          expiracao: 3600,
        },
        devedor: {
          cpf: user.cpf,
          nome: user.name,
        },
        valor: {
          original: `${total.toFixed(2)}`,
        },
        chave: '71cdf9ba-c695-4e3c-b010-abb521a3f1be',
        solicitacaoPagador: description,
      });

      const qrcode = await this.http.get(`/v2/loc/${test.data.loc.id}/qrcode`);
      return qrcode.data;
    } catch (error) {
      console.log(error.response.data);
      throw new AppError(`${JSON.stringify(error.response.data)}`, 404);
    }
  }
}

export { PayGerenciaNetProvider };
