import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { setupTestDatabase } from '../setupTest'

describe('Users (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    await setupTestDatabase()
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create user via POST /users', async () => {
    const res = await request(app.getHttpServer()).post('/users').send({
      firstName: 'Alice',
      lastName: 'Test',
      description: ''
    })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ firstName: 'Alice', lastName: 'Test', description: '' })
  })
})
