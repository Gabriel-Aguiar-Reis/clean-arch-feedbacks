import { Inject, Injectable } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'

@Injectable()
export class GetFeedbacksUseCase {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  async execute(): Promise<Feedback[]> {
    return this.feedbackRepository.get()
  }
}
