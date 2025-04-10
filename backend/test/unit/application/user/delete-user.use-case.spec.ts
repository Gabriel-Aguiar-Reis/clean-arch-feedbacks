import { DeleteUserUseCase } from '@/application/user/use-cases/delete-user.use-case'
import { UserRepository } from '@/domain/repositories/user.repository'
import { NotFoundException } from '@nestjs/common'

describe('DeleteUserUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>
  let useCase: DeleteUserUseCase

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      delete: jest.fn()
    } as any
    useCase = new DeleteUserUseCase(userRepository)
  })

  it('should delete user successfully', async () => {
    userRepository.delete.mockResolvedValue(true)

    await expect(useCase.execute(1)).resolves.toBeUndefined()
    expect(userRepository.delete).toHaveBeenCalledWith(1)
  })

  it('should throw NotFoundException if user not found', async () => {
    userRepository.delete.mockResolvedValue(false)

    await expect(useCase.execute(999)).rejects.toThrow(NotFoundException)
  })
})
