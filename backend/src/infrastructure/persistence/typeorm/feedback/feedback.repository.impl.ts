import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FeedbackRepository } from '@/domain/repositories/feedback.repository'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { Feedback } from '@/domain/entities/feedback.entity'

@Injectable()
export class TypeOrmFeedbackRepository implements FeedbackRepository {
  constructor(
    @InjectRepository(FeedbackOrmEntity)
    private readonly ormRepo: Repository<FeedbackOrmEntity>
  ) {}

  async create(feedback: Omit<Feedback, 'id'>): Promise<Feedback> {
    const entity = this.ormRepo.create(feedback)
    const saved = await this.ormRepo.save(entity)
    return new Feedback(saved.id, saved.comment, saved.rating, saved.userId)
  }
}
