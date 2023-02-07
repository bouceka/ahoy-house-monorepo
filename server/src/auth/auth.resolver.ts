import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => LoginResponse)
  // @UseGuards(GqlAuthGuard)
  // login(
  //   @Args('loginUserInput') loginUserInput: LoginUserInput,
  //   @Context() context,
  // ) {
  //   return this.authService.login(context.user);
  // }

  // @Mutation(() => Admin)
  // signup(
  //   @Args('signupUserInput') signupUserInput: SignupUserInput,
  //   @Context() context,
  // ) {
  //   return this.authService.signup(signupUserInput);
  // }
}
