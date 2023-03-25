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
  numberRooms: number;

  @Column()
  @Field()
  postalCode: string;

  @Column()
  @Field()
  numberBaths: number;

  @Column()
  @Field()
  livingArea: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  address: string;

  @Column({ type: 'numeric', nullable: true })
  @Field({ nullable: true })
  rating: number;

  @Column()
  @Field()
  isActive: boolean;

  @OneToMany(() => Room, (room) => room.property, { onDelete: 'CASCADE' })
  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @ManyToMany(() => Amenity, (amenity) => amenity.properties)
  @JoinTable()
  @Field(() => [Amenity])
  amenities: Amenity[];

  @OneToMany(() => Image, (image) => image.property, { onDelete: 'CASCADE' })
  @Field(() => [Image], { nullable: true })
  images?: Image[];
}
