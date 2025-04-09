import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

type NodeEnv = 'development' | 'test' | 'production'

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  getPort(): number {
    return this.config.get<number>('PORT', 3000)
  }

  getNodeEnv(): NodeEnv {
    return this.config.get<NodeEnv>('NODE_ENV', 'development')
  }

  getDatabaseUrl(): string | undefined {
    return this.config.get<string>('DATABASE_URL')
  }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production'
  }

  isTest(): boolean {
    return this.getNodeEnv() === 'test'
  }
}
