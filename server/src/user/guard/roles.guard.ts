import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { RoleEnum } from '../dto/role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // if it's false it blocks access
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // what is the required role
    const requiredRole = this.reflector.getAllAndOverride<RoleEnum[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return false;
    }
    const user = ctx.getContext().req.user;

    return requiredRole.some((role) => user.role?.includes(role));
  }
}
