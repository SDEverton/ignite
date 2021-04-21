import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_licence,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_licence,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
