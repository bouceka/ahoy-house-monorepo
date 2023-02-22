import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { unlinkSync } from 'fs';
import {
  CloudinaryResponse,
  CloudinaryService,
} from 'src/utils/cloudinary/cloudinary.service';
import { CreateImageInput } from './dto/create-image.input';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createImage(imagePath: string, createImageInput: CreateImageInput) {
    const cloudinaryRes: CloudinaryResponse =
      await this.cloudinaryService.uploadImage(imagePath);
    if (cloudinaryRes.url !== undefined) {
      try {
        unlinkSync(imagePath);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
    const { public_id, url } = cloudinaryRes;
    const { roomId, propertyId } = createImageInput;
    const newImage = this.imageRepository.create({
      createdAt: new Date(),
      url,
      publicId: public_id,
      propertyId,
      roomId,
    });
    return this.imageRepository.save(newImage);
  }

  async getAllImages() {
    return await this.imageRepository.find();
  }

  async getImage(id: string) {
    const getImage = await this.imageRepository.findOne({ where: { id } });
    if (!getImage) {
      throw new NotFoundException('Image not found');
    }
    return getImage;
  }

  async getAllImagesByPropertyId(propertyId: string) {
    return await this.imageRepository.find({ where: { propertyId } });
  }

  async getAllImagesByRoomId(roomId: string) {
    return await this.imageRepository.find({ where: { roomId } });
  }

  // updateImage(id: number, updateImageInput: UpdateImageInput) {
  //   return `This action updates a #${id} image`;
  // }

  async delete(id: string): Promise<Image> {
    const getImage = await this.imageRepository.findOne({
      where: { id },
    });
    if (!getImage) {
      throw new NotFoundException('Image not found in DB');
    }

    const cloudinaryRes = await this.cloudinaryService.deleteImage(
      getImage.publicId,
    );
    if (cloudinaryRes.result !== 'ok') {
      throw new NotFoundException('Image not found on Cloudinary');
    }
    return this.imageRepository.remove(getImage);
  }
}
