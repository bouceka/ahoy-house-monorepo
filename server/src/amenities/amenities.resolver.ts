import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AmenitiesService } from './amenities.service';
import { Amenity } from './entities/amenity.entity';

@Resolver(() => Amenity)
export class AmenitiesResolver {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  // @Mutation(() => Amenity)
  // createAmenity(
  //   @Args('createAmenityInput') createAmenityInput: CreateAmenityInput,
  // ) {
  //   return this.amenitiesService.create(createAmenityInput);
  // }

  // @Query(() => [Amenity], { name: 'amenities' })
  // findAll() {
  //   return this.amenitiesService.findAll();
  // }

  // @Query(() => Amenity, { name: 'amenity' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.amenitiesService.findOne(id);
  // }

  // @Mutation(() => Amenity)
  // updateAmenity(
  //   @Args('updateAmenityInput') updateAmenityInput: UpdateAmenityInput,
  // ) {
  //   return this.amenitiesService.update(
  //     updateAmenityInput.id,
  //     updateAmenityInput,
  //   );
  // }

  @Mutation(() => Amenity)
  removeAmenity(@Args('id', { type: () => Int }) id: number) {
    return this.amenitiesService.remove(id);
  }
}
