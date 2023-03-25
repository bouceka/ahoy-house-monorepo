import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Property } from 'src/properties/property.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  publicId: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  propertyId: string;

  @Column({ nullable: true })
  @Field()
  roomId: string;

  // TODO: Delete images on cloud possible solution cascade: 'remove' https://github.com/typeorm/typeorm/issues/4419
  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  @Field(() => Property)
  property: Property;

  @ManyToOne(() => Room, (room) => room.images, { nullable: true })
  @Field(() => Room)
  room?: Room;
}
