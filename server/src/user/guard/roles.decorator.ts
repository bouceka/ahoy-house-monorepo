import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../dto/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('role', roles);
