import { CreateFeedbacks1712938000001 } from './migrations/1712938000001-create-feedbacks';
import { CreateUsers1712938000000 } from './migrations/1712938000000-create-users';
import { DataSource } from 'typeorm'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { SeedUsers1712938540000 } from '@/infrastructure/database/migrations/1712938540000-seed-users.'

const commonConfig = {
  entities: [UserOrmEntity, FeedbackOrmEntity],
  migrations: [CreateUsers1712938000000, CreateFeedbacks1712938000001, SeedUsers1712938540000],
  synchronize: true
}

let AppDataSource: DataSource

switch (process.env.NODE_ENV) {
  case 'development':
    AppDataSource = new DataSource({
      type: 'sqlite',
      database: 'db.sqlite',
      ...commonConfig
    })
    break

  case 'test':
    AppDataSource = new DataSource({
      type: 'sqlite',
      database: 'test.sqlite',
      ...commonConfig
    })
    break

  case 'production':
    AppDataSource = new DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      migrationsRun: true,
      ...commonConfig
    })
    break

  default:
    throw new Error(`Unknown NODE_ENV: ${process.env.NODE_ENV}`)
}

export { AppDataSource }
