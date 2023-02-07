import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  propertyId: string;

  @Field({ nullable: true })
  roomId?: string;
}
