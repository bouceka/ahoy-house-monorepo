import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { Property } from 'src/properties/property.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/guard/roles.decorator';
import { RoleEnum } from 'src/user/dto/role.enum';
import { OccupiedRoomService } from 'src/occupied-room/occupied-room.service';
import { OccupiedRoom } from 'src/occupied-room/entities/occupied-room.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly occupiedRoomService: OccupiedRoomService,
    private readonly imageService: ImageService,
  ) {}

  // NOT TESTED
  @Mutation(() => Room)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  // DONE
  @Query(() => [Room])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  getAllRooms() {
    return this.roomsService.findAll();
  }

  // DONE
  @Query(() => Room)
  getRoom(@Args('id', { type: () => ID }) id: string) {
    return this.roomsService.findOne(id);
  }

  // // NOT TESTED
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  // NOT TESTED
  @Mutation(() => Room)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN)
  deleteRoom(@Args('id') id: string) {
    return this.roomsService.remove(id);
  }

  // DONE
  @Query(() => [Room])
  getAllAvailableRooms(
    @Args('dateIn') dateIn: Date,
    @Args('dateOut') dateOut: Date,
  ) {
    return this.occupiedRoomService.getAllAvailableRooms(dateIn, dateOut);
  }

  @ResolveField(() => Property)
  property(@Parent() room: Room): Promise<Property> {
    return this.roomsService.getProperty(room.propertyId);
  }

  @ResolveField(() => [Property])
  occupiedRooms(@Parent() room: Room): Promise<OccupiedRoom[]> {
    return this.occupiedRoomService.getOccupiedRoomsByRoom(room.id);
  }

  @ResolveField(() => [Image])
  images(@Parent() room: Room): Promise<Image[]> {
    return this.imageService.getAllImagesByRoomId(room.id);
  }
}
