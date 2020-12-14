import AppError from '@shared/errors/AppError'
import 'reflect-metadata'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserSrvice'


describe('AuthenticateUser', () => {
  it('should be able to Authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johnndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({

      email: 'johnndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);


  });



})
