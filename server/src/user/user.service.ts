import { UpdateUserInput } from './dto/update-user.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response';
import { RoleEnum } from './dto/role.enum';
import { Tenant } from 'src/tenant/entities/tenant.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
  ) {}

  private async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  async getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(id: string): Promise<User> {
    const currentUser = await this.userRepository.findOne({ where: { id } });
    if (!currentUser) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(currentUser);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getTenant(id: string) {
    return await this.tenantRepository.findOne({ where: { userId: id } });
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

  async createAdminUser(signupUserInput: SignupUserInput) {
    const user = await this.findOneByEmail(signupUserInput.email);

    if (user) {
      throw new Error('User already exists!');
    }
    const hash = await bcrypt.hash(signupUserInput.password, 10);

    return this.createUser({
      ...signupUserInput,
      password: hash,
      role: RoleEnum.ADMIN,
    });
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserInput);

    return this.userRepository.save(user);
  }

  async deactivateUser(id: string) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isActive) {
      throw new Error('The user is already deactivated');
    }
    user.isActive = false;

    return this.userRepository.save(user);
  }

  async activateUser(id: string) {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isActive) {
      throw new Error('The user is already activated');
    }
    user.isActive = true;

    return this.userRepository.save(user);
  }

  async getAllActiveUsers() {
    return this.userRepository.find({
      where: { isActive: true },
    });
  }
  async getAllActiveTenants() {
    return this.userRepository.find({
      where: { isActive: true, role: 'tenant' },
    });
  }

  // async createTenantUser(signupUserInput: SignupUserInput) {}

  //   async assignOrdersToUser(orderIds: string[], userId: string): Promise<User> {
  //     const user = await this.userRepository.findOne({ where: { id: userId } });
  //     user.orders = [...user.orders, ...orderIds];
  //     return this.userRepository.save(user);
  //   }
}
