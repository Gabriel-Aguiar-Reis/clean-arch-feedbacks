import { User } from '@/domain/entities/user.entity'

export abstract class UserRepository {
  abstract create(user: Omit<User, 'id'>): Promise<User>
}
