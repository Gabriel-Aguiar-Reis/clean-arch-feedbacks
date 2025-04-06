import { DataSource } from 'typeorm'
import { User } from '@/domain/entities/user.entity'

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [User],
  synchronize: true,
  logging: false
})
