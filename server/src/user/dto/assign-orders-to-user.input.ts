import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignOrdersToUser {
  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsUUID('all', { each: true })
  @Field(() => [ID])
  orderIds: string[];
}
