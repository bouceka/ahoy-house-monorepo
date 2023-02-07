import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOccupiedRoomInput {
  @IsNotEmpty()
  dateIn: Date;

  @IsNotEmpty()
  dateOut: Date;

  @IsString()
  bookingId: string;

  @IsString()
  roomId: string;
}
