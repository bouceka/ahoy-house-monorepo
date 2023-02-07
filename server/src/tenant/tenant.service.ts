import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantInput } from 'src/user/dto/create-tenant.input';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { RoleEnum } from 'src/user/dto/role.enum';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // async create(createTenantInput: CreateTenantInput) {
  //   const user = await this.findOneByEmail(createTenantInput.email);
  //   if (user) {
  //     throw new Error('User already exists!');
  //   }

  //   // return this.tenantRepository.create({
  //   //   ...createTenantInput,
  //   //   role: 'Admin',
  //   //   password: hash,
  //   // });
  //   return 'This action adds a new tenant';
  // }

  // TODO!!!!
  async createTenant(createTenantInput: CreateTenantInput): Promise<Tenant> {
    const { ...userInput }: Partial<CreateUserInput> = createTenantInput;
    const { ...tenantInput }: Partial<Tenant> = createTenantInput;

    const user = await this.userRepository.create({
      ...userInput,
      role: RoleEnum.TENANT,
      isActive: true,
    });
    const newUser = { ...user };
    const currentUser = await this.userRepository.save(newUser);
    const tenant = await this.tenantRepository.create({
      ...tenantInput,
      userId: currentUser.id,
    });
    return this.tenantRepository.save(tenant);
  }

  // findAll() {
  //   return `This action returns all tenant`;
  // }

  findOne(id: string) {
    return this.tenantRepository.find({
      where: { id },
    });
    // return `This action returns a #${id} tenant`;
  }

  // findOneByEmail(email: string) {
  //   return this.tenantRepository.findOne({ where: { email } });
  // }

  // update(id: number, updateTenantInput: UpdateTenantInput) {
  //   return `This action updates a #${id} tenant`;
  // }

  getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
