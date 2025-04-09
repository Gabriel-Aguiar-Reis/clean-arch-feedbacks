import { setupTestDatabase } from '@/../test/setupTest'
import { TypeOrmFeedbackRepository } from '@/infrastructure/persistence/typeorm/feedback/feedback.repository.impl'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { DataSource } from 'typeorm'

describe('TypeOrmFeedbackRepository (integration)', () => {
  let repo: TypeOrmFeedbackRepository
  let userId: number
  let dataSource: DataSource

  beforeAll(async () => {
    const result = await setupTestDatabase()
    dataSource = result.dataSource

    const feedbackRepo = dataSource.getRepository(FeedbackOrmEntity)
    repo = new TypeOrmFeedbackRepository(feedbackRepo)
    userId = result.users[0].id
  })

  afterAll(async () => {
    await dataSource.destroy()
  })

  it('should save feedback correctly', async () => {
    const feedback = await repo.create({
      comment: 'Muito legal!',
      rating: 4,
      userId
    })

    expect(feedback.id).toBeGreaterThan(0)
    expect(feedback.comment).toBe('Muito legal!')
  })
})
