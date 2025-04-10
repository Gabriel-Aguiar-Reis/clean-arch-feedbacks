import { Inject, Injectable } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'
import { InvalidFeedbackException } from '@/domain/exceptions/invalid-feedback.exception'

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
      throw new InvalidFeedbackException('Rating must be between 1 and 5')
    }
    try {
      const feedback = await this.feedbackRepo.create({
        comment: input.comment,
        rating: input.rating,
        userId: input.userId
      })

      return feedback
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new InvalidFeedbackException('User does not exist!')
      }
      throw error
    }
  }
}
