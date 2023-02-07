import { SetMetadata } from '@nestjs/common';
import { Booking } from 'src/bookings/bookings.entity';
import { Property } from 'src/properties/property.entity';
import { User } from 'src/user/user.entity';
import { Action, Subjects } from './ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}
export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) => {
  return SetMetadata(CHECK_ABILITY, requirements);
};

export class ReadUserAbility implements RequiredRule {
  action = Action.Read;
  subject = User;
}
export class DeleteUserAbility implements RequiredRule {
  action = Action.Delete;
  subject = User;
}
export class UpdateUserAbility implements RequiredRule {
  action = Action.Update;
  subject = User;
}
export class CreateUserAbility implements RequiredRule {
  action = Action.Create;
  subject = User;
}
export class ReadBookingAbility implements RequiredRule {
  action = Action.Read;
  subject = Booking;
}
export class CreateBookingAbility implements RequiredRule {
  action = Action.Create;
  subject = Booking;
}
export class CreatePropertyAbility implements RequiredRule {
  action = Action.Create;
  subject = Property;
}
