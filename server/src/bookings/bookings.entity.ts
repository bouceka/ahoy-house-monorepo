import { OccupiedRoom } from './../occupied-room/entities/occupied-room.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tenant } from '../tenant/entities/tenant.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Generated('increment')
  invoiceNumber: number;

  @Column({ nullable: true })
  @Field()
  specialRequest: string;

  @Column()
  @Field()
  checkIn: Date;

  @Column()
  @Field()
  checkOut: Date;

  @Column()
  @Field()
  cost: number;

  @Column()
  @Field()
  numberTenants: number;

  @OneToMany(() => OccupiedRoom, (occupiedRoom) => occupiedRoom.booking)
  @Field(() => [OccupiedRoom])
  occupiedRooms: OccupiedRoom[];

  @Column()
  @Field()
  tenantId: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.bookings, {
    onDelete: 'NO ACTION',
  })
  @Field(() => Tenant)
  tenant: Tenant;
}
