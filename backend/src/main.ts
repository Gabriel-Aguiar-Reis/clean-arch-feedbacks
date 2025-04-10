import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { GlobalExceptionFilter } from '@/presentation/filters/http-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  const config = app.get(ConfigService)
  const port = config.get<number>('PORT') ?? 3000

  await app.listen(port)
  console.log(`App running on http://localhost:${port}`)
}
bootstrap()
