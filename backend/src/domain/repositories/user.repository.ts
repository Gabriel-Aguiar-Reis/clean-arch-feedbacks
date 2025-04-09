import { User } from '../entities/user.entity'

export abstract class UserRepository {
  abstract create(user: Omit<User, 'id'>): Promise<User>
}
