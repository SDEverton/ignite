import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DayjsDateProvider } from './Implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);
