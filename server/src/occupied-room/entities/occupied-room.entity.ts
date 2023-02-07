import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Booking } from '../../bookings/bookings.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';

@Entity()
@ObjectType()
export class OccupiedRoom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  dateIn: Date;

  @Column()
  @Field()
  dateOut: Date;

  @Column()
  @Field()
  bookingId: string;

  @ManyToOne(() => Booking, (booking) => booking.occupiedRooms)
  @Field(() => Booking)
  booking: Booking;

  @Column()
  @Field()
  roomId: string;

  @ManyToOne(() => Room, (room) => room.occupiedRooms)
  @Field(() => Room)
  room: Room;
}
