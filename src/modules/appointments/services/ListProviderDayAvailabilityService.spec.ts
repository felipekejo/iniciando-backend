import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
  })

  it('should be able to list the daily availability of the provider ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    })
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20
    })
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: true },
        { hour: 15, available: true },
        { hour: 16, available: true },
        { hour: 17, available: true },


      ])
    )

  });
})




