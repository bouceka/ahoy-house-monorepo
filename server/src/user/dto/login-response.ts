import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: { firstName: string; lastName: string; email: string; id: string };
}
