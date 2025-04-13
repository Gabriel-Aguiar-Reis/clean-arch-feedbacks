import { validate } from 'class-validator'
import { CreateUserDto } from '@/presentation/user/dtos/create-user.dto'

describe('CreateUserDto Validation', () => {
  it('should be valid with correct values', async () => {
    const dto = new CreateUserDto()
    dto.firstName = 'Gabriel'
    dto.lastName = 'Reis'
    dto.description = 'A happy guy!'

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should fail when fields are missing', async () => {
    const dto = new CreateUserDto()
    dto.firstName = ''
    dto.lastName = ''
    dto.description = ''

    const errors = await validate(dto)
    expect(errors.length).toBe(3)
    expect(errors[0].constraints?.isNotEmpty).toBeDefined()
    expect(errors[1].constraints?.isNotEmpty).toBeDefined()
    expect(errors[2].constraints?.isNotEmpty).toBeDefined()
  })

  it('should fail when fields are wrong type', async () => {
    const dto = new CreateUserDto()
    // @ts-expect-error
    dto.firstName = 123
    // @ts-expect-error
    dto.lastName = true
    // @ts-expect-error
    dto.description = false

    const errors = await validate(dto)
    expect(errors.length).toBe(3)
    expect(errors[0].constraints?.isString).toBeDefined()
    expect(errors[1].constraints?.isString).toBeDefined()
    expect(errors[2].constraints?.isString).toBeDefined()
  })
})
