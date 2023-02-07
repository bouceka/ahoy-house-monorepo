import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Amenity } from 'src/amenities/entities/amenity.entity';
import { Image } from 'src/image/entities/image.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  numberRooms: number;

  @Column()
  @Field()
  postCode: string;

  @Column()
  @Field()
  numberBaths: number;

  @Column()
  @Field()
  size: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  isActive: boolean;

  @OneToMany(() => Room, (room) => room.property)
  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @ManyToMany(() => Amenity, (amenity) => amenity.properties)
  @JoinTable()
  @Field(() => [Amenity])
  amenities: Amenity[];

  @ManyToOne(() => Image, (image) => image.property)
  @Field(() => [Image], { nullable: true })
  images?: Image[];
}
