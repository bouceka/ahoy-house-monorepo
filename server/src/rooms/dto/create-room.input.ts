import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field()
  name: string;

  @Field()
  capacity: number;

  @Field()
  amenities: string;

  @Field()
  description: string;

  @Field()
  livingArea: number;

  @Field()
  pricePerNight: number;

  @Field(() => ID)
  propertyId: string;
}
