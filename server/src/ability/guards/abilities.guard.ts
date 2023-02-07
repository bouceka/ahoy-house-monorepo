import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { CHECK_ABILITY, RequiredRule } from '../ability.decorator';
import { AbilityFactory } from '../ability.factory';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const user = ctx.getContext().req.user;
    const ability = this.caslAbilityFactory.defineAbility(user);
    let userToGet;
    // to get the subject
    if (ctx.getArgs()) {
      userToGet = await this.userService.getUser(ctx.getArgs().id);
    }
    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject || userToGet,
        ),
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
