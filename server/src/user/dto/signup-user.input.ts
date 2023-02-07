import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignupUserInput {
  @MinLength(2)
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'password is too weak',
  //   })
  @Field()
  password: string;

  @IsString()
  @Field()
  firstName: string;

  @IsString()
  @Field()
  lastName: string;
}
