import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 1. middleware manual de CORS para que el preflight nunca falle
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')

    if (req.method === 'OPTIONS') {
      res.sendStatus(204)
      return
    }

    next()
  })

  // 2. el enableCors que ya tenías (déjalo si quieres, pero ya no es necesario con el manual)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization']
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => new BadRequestException(errors)
  }))

  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()