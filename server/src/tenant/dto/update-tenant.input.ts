import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTenantInput {
  @Field(() => Int)
  id: number;
}
