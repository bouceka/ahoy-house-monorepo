import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), CloudinaryModule],
  providers: [ImageResolver, ImageService],
  exports: [ImageService],
})
export class ImageModule {}
