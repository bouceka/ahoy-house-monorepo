import { CreateOccupiedRoomInput } from './create-occupied-room.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOccupiedRoomInput extends PartialType(
  CreateOccupiedRoomInput,
) {
  @Field(() => Int)
  id: number;
}
