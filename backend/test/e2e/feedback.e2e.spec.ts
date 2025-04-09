import { Test } from '@nestjs/testing'
import { AppModule } from '@/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { setupTestDatabase } from '../setupTest'

describe('Feedbacks (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    await setupTestDatabase()

    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create feedback with valid data', async () => {
    const res = await request(app.getHttpServer())
      .post('/feedbacks')
      .send({ comment: 'top', rating: 5, userId: 1 })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      comment: 'top',
      rating: 5,
      userId: 1
    })
  })

  it('should return 400 for invalid rating', async () => {
    const res = await request(app.getHttpServer())
      .post('/feedbacks')
      .send({ comment: 'ruim', rating: 99, userId: 1 })

    expect(res.status).toBe(400)
    expect(res.body.message).toContain('rating must not be greater than 5')
  })
})
