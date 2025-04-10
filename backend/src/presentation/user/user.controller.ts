import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateUserDto } from '@/presentation/user/dtos/create-user.dto'
import { GetUsersUseCase } from '@/application/user/use-cases/get-users.use-case'
import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case'
import { DeleteUserUseCase } from '@/application/user/use-cases/delete-user.use-case'

@Controller('users')
export class UserController {
  constructor(
    private readonly GetUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Get()
  async get() {
    const users = await this.GetUsersUseCase.execute()
    return { users }
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto)
    return { ...user }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.deleteUserUseCase.execute(Number(id))
    return { success }
  }
}
