import { Feedback } from '@/domain/entities/feedback.entity'

export abstract class FeedbackRepository {
  abstract create(feedback: Omit<Feedback, 'id'>): Promise<Feedback>
}
