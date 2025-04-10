import { UpdateFeedbackUseCase } from '@/application/feedback/use-cases/update-feedback.use-case'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'
import { NotFoundException } from '@nestjs/common'

describe('UpdateFeedbackUseCase', () => {
  let repo: jest.Mocked<FeedbackRepository>
  let useCase: UpdateFeedbackUseCase

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn()
    } as any

    useCase = new UpdateFeedbackUseCase(repo)
  })

  it('should update feedback successfully', async () => {
    const existing = new Feedback(1, 'original comment', 3, 1)
    repo.findById.mockResolvedValue(existing)

    const updated = new Feedback(1, 'updated comment', 4, 1)
    repo.update.mockResolvedValue(updated)

    const result = await useCase.execute({
      id: 1,
      comment: 'updated comment',
      rating: 4
    })

    expect(repo.findById).toHaveBeenCalledWith(1)
    expect(repo.update).toHaveBeenCalled()
    expect(result.comment).toBe('updated comment')
    expect(result.rating).toBe(4)
  })

  it('should throw NotFoundException if feedback not found', async () => {
    repo.findById.mockResolvedValue(null)

    await expect(useCase.execute({ id: 999 })).rejects.toThrow(
      NotFoundException
    )
  })
})
