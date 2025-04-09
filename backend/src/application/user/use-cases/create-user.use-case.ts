import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: { firstName: string; lastName: string }): Promise<User> {
    return this.userRepository.create(input)
  }
}
