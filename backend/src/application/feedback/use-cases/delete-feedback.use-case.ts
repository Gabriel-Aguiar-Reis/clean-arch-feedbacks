import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'

@Injectable()
export class DeleteFeedbackUseCase {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepo: FeedbackRepository
  ) {}

  async execute(id: number): Promise<void> {
    const deleted = await this.feedbackRepo.delete(id)

    if (!deleted) {
      throw new NotFoundException('Feedback not found')
    }
  }
}
