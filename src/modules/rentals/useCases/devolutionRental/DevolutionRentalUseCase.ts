import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { PayGerenciaNetProvider } from '@shared/container/providers/PayProvider/implementations/PayGerenciaNetProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
  methodpay?: string;
  installments?: number;
  payment_token?: string;
}

interface IResponse {
  rental: Rental;
  bank_slip?: string;
  barcode?: string;
  imagemQrcode?: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('PayGerenciaNetProvider')
    private payRepository: PayGerenciaNetProvider
  ) {}
  async execute({
    id,
    user_id,
    methodpay,
    installments,
    payment_token,
  }: IRequest): Promise<IResponse> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const user = await this.usersRepository.findById(user_id);
    const date = this.dateProvider.convertToString(1);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    let bankSlip: any;
    let qrcode: any;
    if (methodpay === 'pix') {
      qrcode = await this.payRepository.createPayPix({
        total,
        user,
        rental_id: id,
        description: `${car.name} | ${car.license_plate}`,
      });
    } else {
      bankSlip = await this.payRepository.createPayConventional({
        total,
        user,
        description: `${car.name} | ${car.license_plate}`,
        date,
        installments,
        payment_token,
      });
    }

    const data: IResponse = {
      rental,
      bank_slip: bankSlip?.data.pdf.charge,
      barcode: bankSlip?.data.barcode,
      imagemQrcode: qrcode?.imagemQrcode,
    };

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return data;
  }
}

export { DevolutionRentalUseCase };
