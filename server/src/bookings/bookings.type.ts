import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class BookingType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  specialRequest: string;

  @Field()
  invoiceNumber: number;

  @Field()
  checkIn: string;

  @Field()
  checkOut: string;

  @Field()
  cost: number;

  @Field()
  numberTenants: number;
}
