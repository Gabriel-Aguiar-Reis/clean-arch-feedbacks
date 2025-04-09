import { Body, Controller, Post } from '@nestjs/common'
import { CreateFeedbackDto } from '@/presentation/feedback/dtos/create-feedback.dto'
import { CreateFeedbackUseCase } from '@/application/feedback/use-cases/create-feedback.use-case'

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly createFeedbackUseCase: CreateFeedbackUseCase) {}

  @Post()
  async create(@Body() dto: CreateFeedbackDto) {
    const feedback = await this.createFeedbackUseCase.execute(dto)
    return {
      id: feedback.id,
      comment: feedback.comment,
      rating: feedback.rating,
      userId: feedback.userId
    }
  }
}
