import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(requenst: Request, response: Response): Promise<Response> {
    const { id: user_id } = requenst.user;
    const { id } = requenst.params;
    const { methodpay, installments, payment_token } = requenst.body;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
      methodpay,
      installments,
      payment_token,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
