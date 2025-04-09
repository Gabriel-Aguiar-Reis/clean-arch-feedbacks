import { Injectable } from '@nestjs/common'
import { UserRepository } from '@/domain/repositories/user.repository'
import { User } from '@/domain/entities/user.entity'

interface CreateUserInput {
  firstName: string
  lastName: string
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const user = await this.userRepo.create({
      firstName: input.firstName,
      lastName: input.lastName
    })

    return user
  }
}
