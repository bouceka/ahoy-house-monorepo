import { CreateAmenityInput } from './create-amenity.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAmenityInput extends PartialType(CreateAmenityInput) {
  @Field(() => Int)
  id: number;
}
