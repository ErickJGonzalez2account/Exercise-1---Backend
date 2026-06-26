import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      return next()
    }

    var token = req.headers['authorization']
    var tokenValido = this.configService.get('AUTH_TOKEN')

    if ( !token || token !== tokenValido ) {
      throw new UnauthorizedException('Token inválido o no proporcionado')
    }
    next()
  }
}