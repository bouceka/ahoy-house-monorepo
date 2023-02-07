import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UseGuards } from '@nestjs/common';
import { createWriteStream } from 'fs';

import { Stream } from 'stream';
import { Roles } from 'src/user/guard/roles.decorator';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { RoleEnum } from 'src/user/dto/role.enum';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  // @Mutation(() => Image)
  // @UseInterceptors(FileInterceptor('file'))
  // createImage(@UploadedFile() image: Express.Multer.File) {
  //   // return this.imageService.create(createImageInput, image);
  // }

  @Query(() => [Image])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  getAllImages() {
    return this.imageService.getAllImages();
  }

  @Query(() => Image)
  getImage(@Args('id', { type: () => ID }) id: string) {
    return this.imageService.getImage(id);
  }

  @Mutation(() => Image)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  async uploadImage(
    @Args('file', { type: () => GraphQLUpload })
    { createReadStream, filename }: Upload,
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../images/${filename}`))
        .on('finish', () => {
          try {
            return resolve(
              this.imageService.createImage(
                __dirname + `/../../images/${filename}`,
                createImageInput,
              ),
            );
          } catch (error) {
            throw Error(error);
          }
        })
        .on('error', (error) => reject(error)),
    );
  }

  // @Mutation(() => Image)
  // updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
  //   return this.imageService.updateImage(updateImageInput.id, updateImageInput);
  // }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imageService.remove(id);
  }
}
