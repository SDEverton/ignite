import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      driver_licence,
      cpf,
      birth,
      phone_number,
      address,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_licence,
      cpf,
      birth,
      phone_number,
      address,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
