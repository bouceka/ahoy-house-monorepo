import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Image } from 'src/image/entities/image.entity';
import { OccupiedRoom } from 'src/occupied-room/entities/occupied-room.entity';
import { Property } from 'src/properties/property.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  capacity: number;

  @Column()
  @Field()
  amenities: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  livingArea: number;

  @Column()
  @Field()
  pricePerNight: number;

  @Column()
  @Field(() => ID)
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.rooms)
  @Field(() => Property)
  property: Property;

  @OneToMany(() => OccupiedRoom, (occRoom) => occRoom.room)
  @Field(() => [OccupiedRoom])
  occupiedRooms?: OccupiedRoom[];

  @OneToMany(() => Image, (image) => image.room)
  @Field(() => [Image])
  images?: Image[];
}
