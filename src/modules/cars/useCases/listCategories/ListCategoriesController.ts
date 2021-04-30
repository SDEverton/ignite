import { Request, Response } from 'express';
import { container } from 'tsyringe';

// import { BankSlip } from '@shared/infra/gerencianet/modules/bankSlip';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    // const gerencianet = container.resolve(BankSlip);

    // const test = await gerencianet.execute();
    // console.log(test);

    const all = await listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
