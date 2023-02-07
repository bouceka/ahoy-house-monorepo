import { CloudinaryService } from './cloudinary.service';
import { Module } from '@nestjs/common';
import { cloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [cloudinaryProvider, CloudinaryService],
  exports: [cloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
