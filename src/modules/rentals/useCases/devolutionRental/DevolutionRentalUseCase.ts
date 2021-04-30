import { container, inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { BankSlip } from '@shared/infra/gerencianet/modules/bankSlip';

interface IRequest {
  id: string;
  user_id: string;
}

interface IResponse {
  rental: Rental;
  bank_slip: string;
  barcode: string;
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
    private usersRepository: UsersRepository
  ) {}
  async execute({ id, user_id }: IRequest): Promise<IResponse> {
    const gerencianet = container.resolve(BankSlip);
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const user = await this.usersRepository.findById(user_id);
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

    const bankSlip = await gerencianet.execute({
      total,
      user,
      description: `${car.name} | ${car.license_plate}`,
    });

    const data: IResponse = {
      rental,
      bank_slip: bankSlip.data.pdf.charge,
      barcode: bankSlip.data.barcode,
    };

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return data;
  }
}

export { DevolutionRentalUseCase };
