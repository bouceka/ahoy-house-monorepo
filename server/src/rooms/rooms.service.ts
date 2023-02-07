import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/properties/property.entity';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';

// TODO: Fix Naming convention

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  create(createRoomInput: CreateRoomInput) {
    const newRoom = this.roomRepository.create(createRoomInput);

    return this.roomRepository.save(newRoom);
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: string) {
    return this.roomRepository.findOneOrFail({ where: { id } });
  }

  // update(id: number, updateRoomInput: UpdateRoomInput) {
  //   return `This action updates a #${id} room`;
  // }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  getProperty(propertyId: string): Promise<Property> {
    return this.propertyRepository.findOne({ where: { id: propertyId } });
  }

  getAllRoomsByPropertyId(propertyId: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: { property: { id: propertyId } },
    });
  }
}
