import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '@/domain/repositories/user.repository'

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ) {}

  async execute(userId: number): Promise<void> {
    const deleted = await this.userRepository.delete(userId)

    if (!deleted) {
      throw new NotFoundException('User not found')
    }
  }
}
