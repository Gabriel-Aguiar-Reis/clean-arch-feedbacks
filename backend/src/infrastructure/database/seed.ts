import { AppDataSource } from '@/infrastructure/database/typeorm-datasource'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { faker } from '@faker-js/faker'

async function runSeed() {
  console.log('🔁 Initializing seed...')
  await AppDataSource.initialize()

  if (process.env.NODE_ENV !== 'test') {
    console.error("❌ Seed can't only be run on test environment!")
    process.exit(1)
  }

  const userRepo = AppDataSource.getRepository(UserOrmEntity)
  const feedbackRepo = AppDataSource.getRepository(FeedbackOrmEntity)

  await feedbackRepo.delete({})
  await userRepo.delete({})

  const users: UserOrmEntity[] = []
  const feedbacks: FeedbackOrmEntity[] = []

  for (let i = 0; i < 5; i++) {
    const user = userRepo.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName()
    })
    users.push(await userRepo.save(user))
  }

  for (let i = 0; i < 10; i++) {
    const feedback = feedbackRepo.create({
      comment: faker.lorem.sentences(1),
      rating: faker.number.int({ min: 1, max: 5 }),
      userId: faker.helpers.arrayElement(users).id
    })
    feedbacks.push(await feedbackRepo.save(feedback))
  }

  console.log(
    `✅ Seed finalized with ${users.length} users and ${feedbacks.length} feedbacks.`
  )
  await AppDataSource.destroy()
}

runSeed().catch((err) => {
  console.error('❌ Error executing seed:', err)
  process.exit(1)
})
