import { Injectable } from '@nestjs/common';

@Injectable()
export class AmenitiesService {
  // create(createAmenityInput: CreateAmenityInput) {
  //   return 'This action adds a new amenity';
  // }

  // findAll() {
  //   return 'This action returns all amenities';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} amenity`;
  // }

  // update(id: number, updateAmenityInput: UpdateAmenityInput) {
  //   return `This action updates a #${id} amenity`;
  // }

  remove(id: number) {
    return `This action removes a #${id} amenity`;
  }
}
