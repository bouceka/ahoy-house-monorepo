import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAmenityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
