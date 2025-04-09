import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'

describe('CreateUserUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>
  let useCase: CreateUserUseCase

  beforeEach(() => {
    userRepository = {
      create: jest.fn().mockImplementation(async ({ firstName, lastName }) => {
        return new User(1, firstName, lastName)
      })
    }
    useCase = new CreateUserUseCase(userRepository)
  })

  it('should create a user with valid data', async () => {
    const input = { firstName: 'Gabriel', lastName: 'Reis' }

    const result = await useCase.execute(input)

    expect(result).toBeInstanceOf(User)
    expect(result.firstName).toBe('Gabriel')
    expect(result.lastName).toBe('Reis')
    expect(userRepository.create).toHaveBeenCalledWith(input)
  })
})
