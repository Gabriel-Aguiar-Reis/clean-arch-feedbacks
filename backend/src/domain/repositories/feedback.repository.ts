import { Feedback } from '@/domain/entities/feedback.entity'

export abstract class FeedbackRepository {
  abstract create(feedback: Omit<Feedback, 'id'>): Promise<Feedback>
  abstract findById(id: number): Promise<Feedback | null>
  abstract update(feedback: Feedback): Promise<Feedback>
  abstract delete(id: number): Promise<boolean>
}
