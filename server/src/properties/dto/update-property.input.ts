import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePropertyInput } from './create-property.input';

@InputType()
export class UpdatePropertyInput extends PartialType(CreatePropertyInput) {
  @Field(() => ID)
  id: string;
}
