import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import dbConfig from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(dbConfig)
  ]
})
export class AppModule {}
