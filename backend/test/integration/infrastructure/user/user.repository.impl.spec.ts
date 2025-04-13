import { testDataSource } from '@/../test/test-datasource'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { TypeOrmUserRepository } from '@/infrastructure/persistence/typeorm/user/user.repository.impl'

describe('TypeOrmUserRepository (integration)', () => {
  let repo: TypeOrmUserRepository

  beforeAll(async () => {
    await testDataSource.initialize()
    const userRepo = testDataSource.getRepository(UserOrmEntity)
    repo = new TypeOrmUserRepository(userRepo)
  })

  afterAll(async () => {
    await testDataSource.destroy()
  })

  it('should save and return user', async () => {
    const user = await repo.create({
      firstName: 'Ana',
      lastName: 'Silva',
      description: 'A beautiful woman!'
    })

    expect(user.id).toBeGreaterThan(0)
    expect(user.firstName).toBe('Ana')
    expect(user.lastName).toBe('Silva')
    expect(user.description).toBe('A beautiful woman!')
  })
})
