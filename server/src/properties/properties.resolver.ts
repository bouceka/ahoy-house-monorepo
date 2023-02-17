import { CreatePropertyInput } from './dto/create-property.input';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PropertiesService } from './properties.service';
import { Property } from './property.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/guard/roles.decorator';
import { RoleEnum } from 'src/user/dto/role.enum';
import {
  CheckAbilities,
  CreatePropertyAbility,
} from 'src/ability/ability.decorator';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { UpdatePropertyInput } from './dto/update-property.input';
import { FetchPropertiesInput } from './dto/fetch-properties.input';
import { ImageService } from 'src/image/image.service';

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(
    private propertiesService: PropertiesService,
    private imageService: ImageService,
  ) {}

  // DONE
  @Query(() => [Property])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  getAllProperties(): Promise<Property[]> {
    return this.propertiesService.findAll();
  }

  // DONE
  @Query(() => [Property])
  getAllActiveProperties(): Promise<Property[]> {
    return this.propertiesService.getAllActiveProperties();
  }

  // DONE
  @Query(() => [Property])
  getAllActivePropertiesPag(
    @Args() args: FetchPropertiesInput = { skip: 0, take: 5 },
  ): Promise<Property[]> {
    return this.propertiesService.getAllActivePropertiesPag(args);
  }

  // DONE ?
  @Mutation(() => Property)
  // @UseGuards(JwtAuthGuard, AbilitiesGuard)
  // @CheckAbilities(new CreatePropertyAbility())
  createProperty(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
  ): Promise<Property> {
    return this.propertiesService.createProperty(createPropertyInput);
  }

  // DONE
  @Query(() => Property)
  getActiveProperty(@Args('id') id: string): Promise<Property> {
    return this.propertiesService.getActiveProperty(id);
  }

  // DONE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Mutation(() => Property)
  deleteProperty(@Args('id') id: string): Promise<Property> {
    return this.propertiesService.deleteProperty(id);
  }

  // DONE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Mutation(() => Property)
  updateProperty(
    @Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput,
  ) {
    return this.propertiesService.updateProperty(
      updatePropertyInput.id,
      updatePropertyInput,
    );
  }

  // DONE
  @Mutation(() => Property)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  deactivateProperty(@Args('id') id: string) {
    return this.propertiesService.deactivateProperty(id);
  }

  // DONE
  @Mutation(() => Property)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  activateProperty(@Args('id') id: string) {
    return this.propertiesService.activateProperty(id);
  }

  @ResolveField(() => [Room])
  rooms(@Parent() property: Property) {
    return this.propertiesService.getAllRoomsByPropertyId(property.id);
  }

  @ResolveField(() => [Image])
  images(@Parent() property: Property) {
    return this.propertiesService.getAllImagesByPropertyId(property.id);
  }
}
