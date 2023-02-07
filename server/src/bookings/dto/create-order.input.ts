import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBookingInput {
  // TODO: Not safe to input cost
  @IsNumber()
  @Field()
  cost: number;

  @Field({ nullable: true })
  specialRequest?: string;

  @IsDate()
  @Field()
  checkIn: Date;

  @IsDate()
  @Field()
  checkOut: Date;

  @IsNumber()
  @Field()
  numberTenants: number;

  @IsString()
  @Field(() => ID)
  tenantId: string;

  @IsString()
  @Field(() => ID)
  roomId: string;
}
