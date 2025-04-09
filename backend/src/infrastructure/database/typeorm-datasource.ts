import { DataSource } from 'typeorm'
import { UserOrmEntity } from '../persistence/typeorm/user/user.orm-entity'
import { FeedbackOrmEntity } from '../persistence/typeorm/feedback/feedback.orm-entity'

const commonConfig = {
  entities: [UserOrmEntity, FeedbackOrmEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  synchronize: false
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
