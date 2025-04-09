import { Inject, Injectable } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'

interface CreateFeedbackInput {
  comment: string
  rating: number
  userId: number
}

@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepo: FeedbackRepository
  ) {}

  async execute(input: CreateFeedbackInput): Promise<Feedback> {
    if (input.rating < 1 || input.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    const feedback = await this.feedbackRepo.create({
      comment: input.comment,
      rating: input.rating,
      userId: input.userId
    })

    return feedback
  }
}
