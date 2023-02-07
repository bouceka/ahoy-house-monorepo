import { OccupiedRoomService } from 'src/occupied-room/occupied-room.service';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CheckAbilities,
  CreateBookingAbility,
  ReadBookingAbility,
} from 'src/ability/ability.decorator';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';
import { OccupiedRoom } from 'src/occupied-room/entities/occupied-room.entity';
import { RoleEnum } from 'src/user/dto/role.enum';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { Roles } from 'src/user/guard/roles.decorator';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-order.input';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private bookingsService: BookingsService,
    private readonly occupiedRoomService: OccupiedRoomService,
  ) {}

  // NOT TESTED
  @Mutation(() => Booking)
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new CreateBookingAbility())
  createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    return this.bookingsService.createBookingProcess(createBookingInput);
  }

  // DONE
  @Query(() => [Booking])
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities(new ReadBookingAbility())
  getAllBookingsByTenant(@Args('tenantId') tenantId: string) {
    return this.bookingsService.getAllBookingsByTenant(tenantId);
  }

  // NOT TESTED
  @Query(() => [Booking])
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  // NOT TESTED
  // TODO: Get ONE booking from the tenant
  @Query(() => Booking)
  @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getBooking(@Args('id') id: string) {
    return this.bookingsService.getbooking(id);
  }

  @ResolveField(() => [OccupiedRoom])
  occupiedRooms(@Parent() booking: Booking) {
    return this.occupiedRoomService.getAllOccupiedRoomByBooking(booking.id);
  }
}
