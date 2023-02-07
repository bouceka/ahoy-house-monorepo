import { UpdatePropertyInput } from './dto/update-property.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { Repository } from 'typeorm';
import { CreatePropertyInput } from './dto/create-property.input';
import { Property } from './property.entity';
import { FetchPropertiesInput } from './dto/fetch-properties.input';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private roomsService: RoomsService,
    private imageService: ImageService,
  ) {}

  async createProperty(
    createPropertyInput: CreatePropertyInput,
  ): Promise<Property> {
    const newProperty = this.propertiesRepository.create(createPropertyInput); // newProperty = new Property()
    return this.propertiesRepository.save(newProperty);
  }

  findAll(): Promise<Property[]> {
    return this.propertiesRepository.find(); // SELECT * property
  }

  getAllActiveProperties(): Promise<Property[]> {
    return this.propertiesRepository.find({ where: { isActive: true } });
  }

  async getAllActivePropertiesPag(
    args: FetchPropertiesInput,
  ): Promise<Property[]> {
    const properties = await this.propertiesRepository
      .createQueryBuilder()
      .skip(args.skip)
      .take(args.take)
      .getMany();
    return properties;
  }

  async deleteProperty(id: string): Promise<Property> {
    const property = await this.propertiesRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Did not find the property to delete');
    }
    return this.propertiesRepository.remove(property);
  }

  async getActiveProperty(id: string): Promise<Property> {
    try {
      return await this.propertiesRepository.findOneOrFail({
        where: { id, isActive: true },
      });
    } catch (error) {
      throw new NotFoundException('Could not find the property');
    }
  }

  async getProperty(id: string): Promise<Property> {
    try {
      return await this.propertiesRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProperty(id: string, updatePropertyInput: UpdatePropertyInput) {
    const property = await this.getProperty(id);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    Object.assign(property, updatePropertyInput);

    return this.propertiesRepository.save(property);
  }

  async deactivateProperty(id: string) {
    const user = await this.getProperty(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isActive) {
      throw new Error('The user is already deactivated');
    }
    user.isActive = false;

    return this.propertiesRepository.save(user);
  }

  async activateProperty(id: string) {
    const user = await this.getProperty(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.isActive) {
      throw new Error('The user is already activated');
    }
    user.isActive = true;

    return this.propertiesRepository.save(user);
  }

  getAllRoomsByPropertyId(propertyId: string): Promise<Room[]> {
    return this.roomsService.getAllRoomsByPropertyId(propertyId);
  }

  getAllImagesByPropertyId(propertyId: string): Promise<Image[]> {
    return this.imageService.getAllImagesByPropertyId(propertyId);
  }
}
