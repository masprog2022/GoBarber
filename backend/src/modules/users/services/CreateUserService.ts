import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkSameEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkSameEmail) {
      throw new AppError('This user is already registered.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,

    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
