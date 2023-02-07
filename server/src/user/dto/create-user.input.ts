import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from './role.enum';

@InputType()
export class CreateUserInput {
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
  role: RoleEnum;
}
