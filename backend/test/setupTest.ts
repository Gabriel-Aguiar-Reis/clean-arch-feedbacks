import { testDataSource } from './test-datasource'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { faker } from '@faker-js/faker'

export async function setupTestDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('❌ setupTestDatabase only can be used with NODE_ENV=test')
  }

  if (!testDataSource.isInitialized) {
    await testDataSource.initialize()
  }

  const userRepo = testDataSource.getRepository(UserOrmEntity)
  const feedbackRepo = testDataSource.getRepository(FeedbackOrmEntity)

  await feedbackRepo.delete({})
  await userRepo.delete({})

  const users: UserOrmEntity[] = []

  for (let i = 0; i < 5; i++) {
    const user = userRepo.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    })
    users.push(await userRepo.save(user))
  }

  for (let i = 0; i < 10; i++) {
    const feedback = feedbackRepo.create({
      comment: faker.lorem.sentence(),
      rating: faker.number.int({ min: 1, max: 5 }),
      userId: faker.helpers.arrayElement(users).id
    })
    await feedbackRepo.save(feedback)
  }

  return {
    users,
    dataSource: testDataSource
  }
}
