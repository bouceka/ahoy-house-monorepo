import { CreateBookingInput } from './dto/create-order.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { OccupiedRoomService } from 'src/occupied-room/occupied-room.service';
import { CreateOccupiedRoomInput } from 'src/occupied-room/dto/create-occupied-room.input';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private occupiedRoomService: OccupiedRoomService,
  ) {}

  async getbooking(id: string): Promise<Booking> {
    return this.bookingRepository.findOne({ where: { id } });
  }

  async createBookingProcess(
    createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    try {
      const newBooking = await this.createBooking(createBookingInput);
      const occRoomInput: CreateOccupiedRoomInput = {
        dateIn: newBooking.checkIn,
        dateOut: newBooking.checkOut,
        bookingId: newBooking.id,
        roomId: createBookingInput.roomId,
      };
      this.occupiedRoomService.createOccupiedRoom(occRoomInput);
      return newBooking;
    } catch (error) {
      throw Error(error.message);
    }
  }
  async createBooking(
    createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    const newBooking = this.bookingRepository.create(createBookingInput);
    return this.bookingRepository.save(newBooking);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async getAllBookingsByTenant(tenantId: string) {
    const bookings = await this.bookingRepository.find({ where: { tenantId } });

    return bookings;
  }

  //   async getManybookings(bookingIds: string[]): Promise<booking[]> {
  //     return this.bookingRepository.find({
  //       where: {
  //         id: In(bookingIds),
  //       },
  //     });
  //   }
}
