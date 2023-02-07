import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTenantInput {
  @MinLength(2)
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @Field()
  password: string;

  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @Field()
  lastName: string;

  @IsString()
  @Field()
  profession: string;

  @IsString()
  @Field()
  nationality: string;

  @IsString()
  @Field()
  gender: string;

  @IsString()
  @Field()
  currentAddress: string;

  @IsString()
  @Field()
  personalId: string;

  @IsString()
  @Field()
  personalIdType: string;

  @IsNumber()
  @Field()
  age: number;
}
