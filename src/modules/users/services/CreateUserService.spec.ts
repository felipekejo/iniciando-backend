import AppError from '@shared/errors/AppError'
import 'reflect-metadata'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserSrvice'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johnndoe@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id');

  });
  it('not should be able to create a new with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })).rejects.toBeInstanceOf(AppError);

  });

})





