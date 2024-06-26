import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new BadRequestException('Token Inválido!');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      request['user'] = payload;
    } catch (error) {}

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'];
    if (!authorization) return undefined;
    return authorization ? authorization : undefined;
    // return type === 'Bearer' ? token : undefined;
  }
}
