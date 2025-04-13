import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { GlobalExceptionFilter } from '@/presentation/filters/http-exceptions.filter'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

    logger: ['log', 'warn', 'error', 'debug', 'verbose'],
  })

  app.useGlobalFilters(new GlobalExceptionFilter())

  const config = app.get(ConfigService)
  const port = config.get<number>('PORT') ?? 3000
  app.enableCors({ origin: '*' })

  await app.listen(port);
  Logger.log(`App running on http://localhost:${port}`, 'Bootstrap')
}
bootstrap()
