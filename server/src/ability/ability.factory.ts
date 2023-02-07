import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Booking } from 'src/bookings/bookings.entity';
import { Property } from 'src/properties/property.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { RoleEnum } from 'src/user/dto/role.enum';
import { User } from 'src/user/user.entity';

export enum Action {
  Manage = 'manage', // any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// for what entities we going to use our authorization
export type Subjects =
  | InferSubjects<
      typeof User | typeof Tenant | typeof Property | typeof Booking
    >
  | 'all';

// taking actions and subjects together

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { build, can, cannot } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    switch (user.role) {
      case RoleEnum.SUPER_ADMIN:
        can(Action.Manage, 'all');
        break;
      case RoleEnum.ADMIN:
        // ** ADMIN READ ** //
        can([Action.Read, Action.Update], User, { role: { $eq: 'tenant' } }); // admin can read tenants
        can([Action.Read, Action.Update], User, { id: { $eq: user.id } });
        cannot([Action.Read, Action.Update], User, {
          role: { $eq: 'super_admin' },
        }).because('Admin cannot handle  super admins'); // admin cannot read super admins
        cannot([Action.Read, Action.Update], User, {
          id: { $ne: user.id },
          role: { $eq: 'admin' },
        }).because('Admin cannot handle other admins'); // admin cannot read other admins
        can(Action.Create, Property);
        can(Action.Create, Booking);
        break;
      case RoleEnum.TENANT:
        // ** TENANT READ ** //
        can([Action.Read, Action.Update], User, { id: { $eq: user.id } });
        cannot([Action.Read, Action.Update], User, {
          id: { $ne: user.id },
        }).because('Tenant cannot handle other users');
        // ** BOOKING ** //
        can([Action.Read], Booking, { id: { $eq: user.id } });
        can([Action.Create], Booking);
        cannot([Action.Read], Booking, {
          id: { $ne: user.id },
        }).because('Tenant cannot handle other users');
        // ** PROPERTY ** //
        cannot(Action.Create, Property).because(
          'Tenant cannot create property',
        );
        break;
      default:
        break;
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>, // it's gonna check type of subject
    });
  }
}
