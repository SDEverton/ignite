import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { deleteFile } from '@utils/file';

interface IResquest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IResquest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
