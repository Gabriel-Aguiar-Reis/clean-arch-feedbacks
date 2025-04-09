import { CreateFeedbackUseCase } from '@/application/feedback/use-cases/create-feedback.use-case'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'

describe('CreateFeedbackUseCase', () => {
  let repo: jest.Mocked<FeedbackRepository>
  let useCase: CreateFeedbackUseCase

  beforeEach(() => {
    repo = {
      create: jest
        .fn()
        .mockImplementation(
          async (data) =>
            new Feedback(1, data.comment, data.rating, data.userId)
        )
    }
    useCase = new CreateFeedbackUseCase(repo)
  })

  it('should create feedback with valid data', async () => {
    const result = await useCase.execute({
      comment: 'ótimo atendimento',
      rating: 5,
      userId: 1
    })

    expect(result).toBeInstanceOf(Feedback)
    expect(result.comment).toBe('ótimo atendimento')
    expect(result.rating).toBe(5)
    expect(repo.create).toHaveBeenCalled()
  })

  it('should throw error for invalid rating', async () => {
    await expect(
      useCase.execute({ comment: 'bom', rating: 10, userId: 1 })
    ).rejects.toThrow('Rating must be between 1 and 5')
  })
})
