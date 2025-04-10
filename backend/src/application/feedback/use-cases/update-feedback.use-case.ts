import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'
import { InvalidFeedbackUpdateException } from '@/domain/exceptions/invalid-feedback-update.exception'
import { number } from 'zod'

interface UpdateFeedbackInput {
  id: number
  comment?: string
  rating?: number
}

@Injectable()
export class UpdateFeedbackUseCase {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepo: FeedbackRepository
  ) {}

  async execute(input: UpdateFeedbackInput): Promise<Feedback> {
    if (input.rating < 1 || input.rating > 5) {
      throw new InvalidFeedbackUpdateException('Rating must be between 1 and 5')
    }

    if ('userId' in input) {
      throw new InvalidFeedbackUpdateException('userId cannot be updated!')
    }

    const existing = await this.feedbackRepo.findById(input.id)
    if (!existing) {
      throw new NotFoundException('Feedback not found')
    }

    const updated = await this.feedbackRepo.update({
      ...existing,
      ...input
    })

    return updated
  }
}
