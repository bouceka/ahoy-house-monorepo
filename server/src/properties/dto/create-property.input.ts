import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

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
  size: number;

  @MaxLength(6)
  @Field()
  postCode: string;

  @Field()
  address: string;

  @Field()
  isActive: boolean;
}
