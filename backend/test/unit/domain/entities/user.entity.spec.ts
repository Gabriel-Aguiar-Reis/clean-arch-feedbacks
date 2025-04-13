import { User } from '@/domain/entities/user.entity'

describe('User Entity', () => {
  it('should create a user with correct properties', () => {
    const user = new User(1, 'John', 'Doe', 'A happy guy!')

    expect(user.id).toBe(1)
    expect(user.firstName).toBe('John')
    expect(user.lastName).toBe('Doe')
    expect(user.description).toBe('A happy guy!')
  })

  it('should allow changing the name fields (if not readonly)', () => {
    const user = new User(1, 'Gabriel', 'Reis', 'A happy guy!')
    user.firstName = 'Gabe'
    expect(user.firstName).toBe('Gabe')
  })
})
