// this is a database entity

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  role: string;

  @Column({ nullable: true })
  @Field()
  phone: string;

  @Column()
  @Field()
  isActive: boolean;

  @OneToOne(() => Tenant, (tenant) => tenant.user)
  @Field(() => Tenant, { nullable: true })
  tenant?: Tenant;
}
