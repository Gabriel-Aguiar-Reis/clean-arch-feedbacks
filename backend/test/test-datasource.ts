import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { DataSource } from 'typeorm'

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [FeedbackOrmEntity, UserOrmEntity],
  synchronize: true,
  logging: false
})
