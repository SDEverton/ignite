import { container } from 'tsyringe';

import { PayGerenciaNetProvider } from './implementations/PayGerenciaNetProvider';
import { IPayProvider } from './IPayProvider';

container.registerSingleton<IPayProvider>(
  'PayGerenciaNetProvider',
  PayGerenciaNetProvider
);
