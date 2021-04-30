import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

import { gerencianet } from '../../config';

interface IRequest {
  total: number;
  user: {
    name: string;
    email: string;
  };
  description: string;
  installments?: number;
  payment_token?: string;
}

interface IResponse {
  code: number;
  data: {
    barcode: string;
    link: string;
    pdf: {
      charge: string;
    };
    expire_at: string;
    charge_id: number;
    status: string;
    total: number;
    payment: string;
  };
}

@injectable()
class BankSlip {
  constructor(
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    total,
    user,
    description,
    installments,
    payment_token,
  }: IRequest): Promise<IResponse> {
    const date = this.dateProvider.convertToString(1);

    const bankingBillet = {
      payment: {
        banking_billet: {
          expire_at: date,
          customer: {
            name: user.name,
            email: user.email,
            cpf: '04267484171',
            phone_number: '5144916523',
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
            street: 'Street 3',
            number: 10,
            neighborhood: 'Bauxita',
            zipcode: '35400000',
            city: 'Ouro Preto',
            state: 'MG',
          },
          customer: {
            name: user.name,
            email: user.email,
            cpf: '04267484171',
            phone_number: '5144916523',
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
      console.log(installments);
      const response: IResponse = await gerencianet.oneStep(
        [],
        installments !== null ? credCard : bankingBillet
      );
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export { BankSlip };
