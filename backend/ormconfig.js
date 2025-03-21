const dbConfig = {
  synchronize: false
}

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: false
    })
    break
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      synchronize: false
    })
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['dist/**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false
      }
    })
    break

  default:
    throw new Error('Unknown NODE_ENV: ' + process.env.NODE_ENV)
}

export default dbConfig
