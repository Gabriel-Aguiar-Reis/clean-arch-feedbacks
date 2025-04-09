import { User } from '@/domain/entities/user.entity'

describe('User Entity', () => {
  it('should create a user with correct properties', () => {
    const user = new User(1, 'John', 'Doe')

    expect(user.id).toBe(1)
    expect(user.firstName).toBe('John')
    expect(user.lastName).toBe('Doe')
  })

  it('should allow changing the name fields (if not readonly)', () => {
    const user = new User(1, 'Gabriel', 'Reis')
    user.firstName = 'Gabe'
    expect(user.firstName).toBe('Gabe')
  })
})
