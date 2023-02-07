import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AbilityFactory } from 'src/ability/ability.factory';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  CheckAbilities,
  ReadUserAbility,
  UpdateUserAbility,
} from '../ability/ability.decorator';
import { AbilitiesGuard } from '../ability/guards/abilities.guard';
import { Roles } from './guard/roles.decorator';
import { RoleEnum } from './dto/role.enum';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { RolesGuard } from './guard/roles.guard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  // DONE
  @Query(() => User)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new ReadUserAbility())
  async getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  // DONE
  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // DONE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN)
  @Mutation(() => User)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // DONE
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.userService.login(context.user);
  }

  // DONE
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN)
  createAdminUser(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.userService.createAdminUser(signupUserInput);
  }

  // DONE
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new UpdateUserAbility())
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  // DONE
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new UpdateUserAbility())
  deactivateUser(@Args('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  // DONE
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new UpdateUserAbility())
  activateUser(@Args('id') id: string) {
    return this.userService.activateUser(id);
  }

  // DONE
  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN)
  getAllActiveUsers() {
    return this.userService.getAllActiveUsers();
  }

  // DONE
  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  getAllActiveTenants() {
    return this.userService.getAllActiveUsers();
  }

  // DONE
  @ResolveField(() => Tenant)
  tenant(@Parent() user: User): Promise<Tenant> {
    return this.userService.getTenant(user.id);
  }

  // @ResolveField()
  // async orders(@Parent() user: User) {
  //   console.log(user);
  // }
}
