import { User } from '@/domain/entities/user.entity'

export abstract class UserRepository {
  abstract get(): Promise<User[]>
  abstract create(user: Omit<User, 'id'>): Promise<User>
  abstract delete(id: number): Promise<boolean>
}
