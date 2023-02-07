import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Booking } from 'src/bookings/bookings.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  profession: string;

  @Column()
  @Field()
  nationality: string;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  currentAddress: string;

  @Column()
  @Field()
  personalId: string;

  @Column()
  @Field()
  personalIdType: string;

  @Column()
  @Field()
  age: number;

  @Column()
  @Field(() => ID)
  userId: string;

  @OneToOne(() => User, (property) => property.tenant, { onDelete: 'CASCADE' })
  @JoinColumn() // indicates there the relationship id is going to belong -> Join Column is required in OneToOne Relation
  @Field(() => User)
  user: User;

  @OneToMany(() => Booking, (booking) => booking.tenant)
  @Field(() => [Booking], { nullable: true })
  bookings: Booking[];
}
