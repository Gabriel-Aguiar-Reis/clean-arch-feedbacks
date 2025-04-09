import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case'
import { CreateUserDto } from '@/presentation/user/dtos/create-user.dto'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto)
    return {
      ...user
    }
  }
}
