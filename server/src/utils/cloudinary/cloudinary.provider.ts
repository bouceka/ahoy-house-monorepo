import * as CloudinaryLib from 'cloudinary';
import { Provider } from '@nestjs/common';

export const Cloudinary = 'lib:cloudinary';

export const cloudinaryProvider: Provider = {
  provide: Cloudinary,
  useValue: CloudinaryLib.v2,
};
