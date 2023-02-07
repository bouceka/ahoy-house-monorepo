import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OccupiedRoomService } from './occupied-room.service';
import { OccupiedRoom } from './entities/occupied-room.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/user/guard/roles.decorator';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { RoleEnum } from 'src/user/dto/role.enum';
import { Booking } from 'src/bookings/bookings.entity';
import { BookingsService } from 'src/bookings/bookings.service';

@Resolver(() => OccupiedRoom)
export class OccupiedRoomResolver {
  constructor(
    private readonly occupiedRoomService: OccupiedRoomService,
    private readonly bookingService: BookingsService,
  ) {}

  // @Mutation(() => OccupiedRoom)
  // createOccupiedRoom(@Args('createOccupiedRoomInput') createOccupiedRoomInput: CreateOccupiedRoomInput) {
  //   return this.occupiedRoomService.create(createOccupiedRoomInput);
  // }

  @Mutation(() => [OccupiedRoom])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  checkRoomAvailability(
    @Args('roomId') roomId: string,
    @Args('dateIn') dateIn: Date,
    @Args('dateOut') dateOut: Date,
  ) {
    return this.occupiedRoomService.checkAvailability(roomId, dateIn, dateOut);
  }
  @Mutation(() => [OccupiedRoom])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  checkAllRoomsAvailability(
    @Args('dateIn') dateIn: Date,
    @Args('dateOut') dateOut: Date,
  ) {
    return this.occupiedRoomService.checkAllBookedRooms(dateIn, dateOut);
  }

  @ResolveField(() => Room)
  room(@Parent() occupiedRoom: OccupiedRoom) {
    return this.occupiedRoomService.getRoomForOccupiedRoom(occupiedRoom.roomId);
  }

  @ResolveField(() => Booking)
  booking(@Parent() occupiedRoom: OccupiedRoom) {
    return this.bookingService.getbooking(occupiedRoom.bookingId);
  }

  // @Query(() => OccupiedRoom, { name: 'occupiedRoom' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.occupiedRoomService.findOne(id);
  // }

  // @Mutation(() => OccupiedRoom)
  // updateOccupiedRoom(@Args('updateOccupiedRoomInput') updateOccupiedRoomInput: UpdateOccupiedRoomInput) {
  //   return this.occupiedRoomService.update(updateOccupiedRoomInput.id, updateOccupiedRoomInput);
  // }

  // @Mutation(() => OccupiedRoom)
  // removeOccupiedRoom(@Args('id', { type: () => Int }) id: number) {
  //   return this.occupiedRoomService.remove(id);
  // }
}
