// auth.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      // Verify the token
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
