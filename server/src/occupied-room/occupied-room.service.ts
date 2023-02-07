import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOccupiedRoomInput } from './dto/create-occupied-room.input';
import { OccupiedRoom } from './entities/occupied-room.entity';
import * as moment from 'moment';
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class OccupiedRoomService {
  constructor(
    @InjectRepository(OccupiedRoom)
    private occupiedRoomRepository: Repository<OccupiedRoom>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  createOccupiedRoom(createOccupiedRoomInput: CreateOccupiedRoomInput) {
    const newOccupiedRoom = this.occupiedRoomRepository.create(
      createOccupiedRoomInput,
    );
    return this.occupiedRoomRepository.save(newOccupiedRoom);
  }

  async checkAvailability(roomId: string, dateIn?: Date, dateOut?: Date) {
    const getAllBookings = await this.occupiedRoomRepository.find({
      where: { roomId },
      order: { dateIn: 'ASC' },
    });

    const filteredRooms = getAllBookings.filter((occRoom) =>
      this.isBookedInPeriod(occRoom, dateIn, dateOut),
    );
    return filteredRooms;
  }

  async checkAllBookedRooms(dateIn?: Date, dateOut?: Date) {
    const getAllBookings = await this.occupiedRoomRepository.find();

    const filteredRooms = getAllBookings.filter((occRoom) =>
      this.isBookedInPeriod(occRoom, dateIn, dateOut),
    );
    return filteredRooms;
  }

  // TODO: Fix number of rooms fetched based on query (for example take: 5)
  async getAllAvailableRooms(dateIn?: Date, dateOut?: Date) {
    const allBookings = await this.occupiedRoomRepository.find();
    const allRooms = await this.roomsRepository.find();

    const filteredBookings = allBookings.filter((occRoom) =>
      this.isBookedInPeriod(occRoom, dateIn, dateOut),
    );
    const filteredRooms = allRooms.filter(
      (room) => !filteredBookings.some((booking) => booking.roomId === room.id),
    );
    return filteredRooms;
  }

  isBookedInPeriod(
    occupiedRoom: OccupiedRoom,
    startAt: Date,
    endAt: Date,
  ): boolean {
    const proposedStartAt = moment(startAt);
    const proposedEndAt = moment(endAt);

    const occupiedRoomStartAt = moment(occupiedRoom.dateIn);
    const occupiedRoomEndAt = moment(occupiedRoom.dateOut);

    return (
      proposedStartAt < occupiedRoomStartAt && occupiedRoomEndAt < proposedEndAt
    );
  }

  async getOccupiedRoom(id: string) {
    return await this.occupiedRoomRepository.findOne({ where: { id } });
  }

  async getOccupiedRoomsByRoom(roomId: string) {
    return await this.occupiedRoomRepository.find({ where: { roomId } });
  }
  async getAllOccupiedRoomByBooking(bookingId: string) {
    return await this.occupiedRoomRepository.find({ where: { bookingId } });
  }

  async getRoomForOccupiedRoom(roomId: string) {
    return await this.roomsRepository.findOne({ where: { id: roomId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} occupiedRoom`;
  }

  // update(id: number, updateOccupiedRoomInput: UpdateOccupiedRoomInput) {
  //   return `This action updates a #${id} occupiedRoom`;
  // }

  remove(id: number) {
    return `This action removes a #${id} occupiedRoom`;
  }
}
