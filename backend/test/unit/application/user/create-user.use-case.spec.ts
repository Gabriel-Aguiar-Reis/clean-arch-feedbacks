import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'

describe('CreateUserUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>
  let useCase: CreateUserUseCase

  beforeEach(() => {
    userRepository = {
      create: jest.fn().mockImplementation(async ({ firstName, lastName, description }) => {
        return new User(1, firstName, lastName, description)
      }),
      get: jest.fn(),
      delete: jest.fn()
    }
    useCase = new CreateUserUseCase(userRepository)
  })

  it('should create a user with valid data', async () => {
    const input = { firstName: 'Gabriel', lastName: 'Reis', description: 'A happy guy!' }

    const result = await useCase.execute(input)

    expect(result).toBeInstanceOf(User)
    expect(result.firstName).toBe('Gabriel')
    expect(result.lastName).toBe('Reis')
    expect(result.description).toBe('A happy guy!')
    expect(userRepository.create).toHaveBeenCalledWith(input)
  })
})
