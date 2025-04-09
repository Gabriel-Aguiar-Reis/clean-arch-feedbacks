import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@/config/config.module'
import { databaseConfig } from '@/config/database.config'

import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'

import { TypeOrmUserRepository } from '@/infrastructure/persistence/typeorm/user/user.repository.impl'
import { TypeOrmFeedbackRepository } from '@/infrastructure/persistence/typeorm/feedback/feedback.repository.impl'

import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case'
import { CreateFeedbackUseCase } from '@/application/feedback/use-cases/create-feedback.use-case'

import { UserController } from '@/presentation/user/user.controller'
import { FeedbackController } from '@/presentation/feedback/feedback.controller'

import { AppConfigService } from '@/config/app-config.service'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig
    }),
    TypeOrmModule.forFeature([UserOrmEntity, FeedbackOrmEntity])
  ],
  providers: [
    AppConfigService,
    CreateUserUseCase,
    CreateFeedbackUseCase,
    { provide: 'UserRepository', useClass: TypeOrmUserRepository },
    { provide: 'FeedbackRepository', useClass: TypeOrmFeedbackRepository }
  ],
  controllers: [UserController, FeedbackController]
})
export class AppModule {}
