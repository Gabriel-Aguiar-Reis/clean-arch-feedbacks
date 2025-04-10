import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.get()
  }
}
