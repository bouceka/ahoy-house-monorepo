import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsNumber, MaxLength } from 'class-validator';

@InputType()
export class CreatePropertyInput {
  @IsAlpha()
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  numberBaths: number;

  @IsAlpha()
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
