import { DeleteFeedbackUseCase } from '@/application/feedback/use-cases/delete-feedback.use-case'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { NotFoundException } from '@nestjs/common'

describe('DeleteFeedbackUseCase', () => {
  let repo: jest.Mocked<FeedbackRepository>
  let useCase: DeleteFeedbackUseCase

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      delete: jest.fn()
    } as any

    useCase = new DeleteFeedbackUseCase(repo)
  })

  it('should delete feedback successfully', async () => {
    repo.delete.mockResolvedValue(true)

    await expect(useCase.execute(1)).resolves.toBeUndefined()
    expect(repo.delete).toHaveBeenCalledWith(1)
  })

  it('should throw NotFoundException if feedback not found', async () => {
    repo.delete.mockResolvedValue(false)

    await expect(useCase.execute(123)).rejects.toThrow(NotFoundException)
  })
})
