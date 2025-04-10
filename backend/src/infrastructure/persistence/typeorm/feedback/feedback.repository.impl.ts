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

  async get(): Promise<Feedback[]> {
    const feedbacks = await this.ormRepo.find()
    return feedbacks
  }
  async create(feedback: Omit<Feedback, 'id'>): Promise<Feedback> {
    const entity = this.ormRepo.create(feedback)
    const saved = await this.ormRepo.save(entity)
    return new Feedback(saved.id, saved.comment, saved.rating, saved.userId)
  }

  async findById(id: number): Promise<Feedback | null> {
    const found = await this.ormRepo.findOne({ where: { id } })
    if (!found) return null
    return new Feedback(found.id, found.comment, found.rating, found.userId)
  }

  async update(feedback: Feedback): Promise<Feedback> {
    const updated = await this.ormRepo.save({
      id: feedback.id,
      comment: feedback.comment,
      rating: feedback.rating,
      userId: feedback.userId
    })
    return new Feedback(
      updated.id,
      updated.comment,
      updated.rating,
      updated.userId
    )
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepo.delete(id)
    return result.affected !== 0
  }
}
