import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>
  ) {}

  async get(): Promise<User[]> {
    const users = await this.ormRepo.find()
    return users
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const ormUser = this.ormRepo.create(user)
    const saved = await this.ormRepo.save(ormUser)
    return new User(saved.id, saved.firstName, saved.lastName, saved.description)
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepo.delete(id)
    return result.affected !== 0
  }
}
