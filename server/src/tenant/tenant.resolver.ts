import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { TenantService } from './tenant.service';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantInput } from 'src/user/dto/create-tenant.input';
import { User } from 'src/user/user.entity';

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  // @Mutation(() => Tenant)
  // createTenant(
  //   @Args('createTenantInput') createTenantInput: CreateTenantInput,
  // ) {
  //   // return this.tenantService.create(createTenantInput);
  // }

  @Mutation(() => Tenant)
  createTenant(
    @Args('createTenantInput') createTenantInput: CreateTenantInput,
  ) {
    return this.tenantService.createTenant(createTenantInput);
  }

  // @Query(() => [Tenant], { name: 'tenant' })
  // getAllTenant() {
  //   return this.tenantService.findAll();
  // }

  @Query(() => Tenant, { name: 'tenant' })
  getTenant(@Args('id', { type: () => String }) id: string) {
    return this.tenantService.findOne(id);
  }

  // @Mutation(() => Tenant)
  // updateRoom(@Args('updateRoomInput') updateTenantInput: UpdateTenantInput) {
  //   return this.tenantService.update(updateTenantInput.id, updateTenantInput);
  // }

  @ResolveField(() => User)
  user(@Parent() tenant: Tenant): Promise<User> {
    return this.tenantService.getUser(tenant.userId);
  }
}
