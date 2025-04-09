import { validateEnv } from '@/config/env.validation'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
    })
  ]
})
export class ConfigModule {}
