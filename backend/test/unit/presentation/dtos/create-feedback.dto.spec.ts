import { validate } from 'class-validator'
import { CreateFeedbackDto } from '@/presentation/feedback/dtos/create-feedback.dto'

describe('CreateFeedbackDto', () => {
  it('should be valid with correct data', async () => {
    const dto = new CreateFeedbackDto()
    dto.comment = 'Muito bom'
    dto.rating = 5
    dto.userId = 1

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should be invalid with empty comment or wrong rating', async () => {
    const dto = new CreateFeedbackDto()
    dto.comment = ''
    dto.rating = 10
    dto.userId = 1

    const errors = await validate(dto)
    expect(errors.length).toBeGreaterThan(0)
  })
})
