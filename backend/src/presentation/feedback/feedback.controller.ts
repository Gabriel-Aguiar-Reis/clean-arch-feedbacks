import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { CreateFeedbackDto } from '@/presentation/feedback/dtos/create-feedback.dto'
import { UpdateFeedbackDto } from '@/presentation/feedback/dtos/update-feedback.dto'
import { CreateFeedbackUseCase } from '@/application/feedback/use-cases/create-feedback.use-case'
import { UpdateFeedbackUseCase } from '@/application/feedback/use-cases/update-feedback.use-case'
import { DeleteFeedbackUseCase } from '@/application/feedback/use-cases/delete-feedback.use-case'
import { GetFeedbacksUseCase } from '@/application/feedback/use-cases/get-feedbacks.use-case'

@Controller('feedbacks')
export class FeedbackController {
  constructor(
    private readonly getFeedbacksUseCase: GetFeedbacksUseCase,
    private readonly createFeedbackUseCase: CreateFeedbackUseCase,
    private readonly updateFeedbackUseCase: UpdateFeedbackUseCase,
    private readonly deleteFeedbackUseCase: DeleteFeedbackUseCase
  ) {}

  @Get()
  async get() {
    const feedbacks = await this.getFeedbacksUseCase.execute()
    return feedbacks
  }

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    const feedback = await this.updateFeedbackUseCase.execute({
      id: Number(id),
      ...dto
    })
    return feedback
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.deleteFeedbackUseCase.execute(Number(id))
    return { success }
  }
}
