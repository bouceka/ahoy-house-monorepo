import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { LoginResponse } from 'src/user/dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Partial<User>): Promise<LoginResponse> {
    // const user = await this.adminService.findOneByEmail(loginUserInput.email);
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        role: user.role,
      }),
      user: {
        firstName: user.firstName,
        lastName: user.firstName,
        email: user.email,
        id: user.id,
      },
    };
  }

  // async signup(signupUserInput: SignupUserInput) {
  //   const user = await this.userService.findOneByEmail(signupUserInput.email);

  //   if (user) {
  //     throw new Error('User already exists!');
  //   }
  //   const hash = await bcrypt.hash(signupUserInput.password, 10);

  //   return this.userService.createUser({
  //     ...signupUserInput,
  //     password: hash,
  //   });
  // }

  async findOneByEmail(email: string) {
    return await this.userService.findOneByEmail(email);
  }
  // create(createAuthInput: CreateAuthInput) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
