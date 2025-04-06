import { validate } from 'class-validator'
import { User } from '../user.entity'

describe('User Entity Validation', () => {
  it('should be valid with correct data', async () => {
    const user = new User()
    user.firstName = 'John'
    user.lastName = 'Doe'

    const errors = await validate(user)
    expect(errors.length).toBe(0)
  })

  it('should be invalid with wrong types', async () => {
    const user = new User()
    // @ts-expect-error: intentionally assigning wrong types
    user.firstName = 123
    // @ts-expect-error
    user.lastName = false

    const errors = await validate(user)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].constraints?.isString).toBeDefined()
    expect(errors[1].constraints?.isString).toBeDefined()
  })

  it('should be invalid when empty', async () => {
    const user = new User()
    user.firstName = ''
    user.lastName = ''

    const errors = await validate(user)
    expect(errors.length).toBe(2)
    expect(errors[0].constraints?.isNotEmpty).toBeDefined()
    expect(errors[1].constraints?.isNotEmpty).toBeDefined()
  })
})
