import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/properties/property.entity';
import { Repository } from 'typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './entities/room.entity';
import { UpdateRoomInput } from './dto/update-room.input';

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

  async update(id: string, updateRoomInput: UpdateRoomInput) {
    const room = await this.findOne(id);
    if (!room) {
      throw new NotFoundException('Property not found');
    }
    Object.assign(room, updateRoomInput);

    return this.roomRepository.save(room);
  }

  async remove(id: string) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException('Did not find the property to delete');
    }
    return await this.roomRepository.remove(room);
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
