import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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