import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { Feedback } from '@/domain/entities/feedback.entity'

interface EditFeedbackInput {
  id: number
  comment?: string
  rating?: number
}

@Injectable()
export class EditFeedbackUseCase {
  constructor(
    @Inject('FeedbackRepository')
    private readonly feedbackRepo: FeedbackRepository
  ) {}

  async execute(input: EditFeedbackInput): Promise<Feedback> {
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
