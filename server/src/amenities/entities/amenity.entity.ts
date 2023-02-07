import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Property } from 'src/properties/property.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  type: string;

  @ManyToMany(() => Property, (property) => property.amenities)
  @Field(() => [Property])
  properties: Property[];
}
