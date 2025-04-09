import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { UserOrmEntity } from '@/infrastructure/persistence/typeorm/user/user.orm-entity'
import { FeedbackOrmEntity } from '@/infrastructure/persistence/typeorm/feedback/feedback.orm-entity'

export const databaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  const env = configService.get<'production' | 'development' | 'test'>(
    'NODE_ENV'
  )
  const isProd = env === 'production'

  const entities = [UserOrmEntity, FeedbackOrmEntity]

  if (isProd) {
    return {
      type: 'postgres',
      url: configService.get<string>('DATABASE_URL'),
      entities,
      synchronize: false,
      ssl: { rejectUnauthorized: false }
    }
  }

  return {
    type: 'sqlite',
    database: env === 'test' ? 'test.sqlite' : 'db.sqlite',
    entities,
    synchronize: true
  }
}
