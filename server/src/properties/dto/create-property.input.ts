import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';

@InputType()
export class CreatePropertyInput {
  @Field()
  description: string;

  @Field()
  numberBaths: number;

  @Field()
  name: string;

  @IsNumber()
  @Field()
  numberRooms: number;

  @IsNumber()
  @Field()
  livingArea: number;

  @MaxLength(7)
  @Field()
  postalCode: string;

  @Field()
  address: string;

  @Field()
  isActive: boolean;
}
