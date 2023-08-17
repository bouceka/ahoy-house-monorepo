import { Inject, Injectable } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';

export interface CloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  url: string;
  secure_url: string;
  asset_id: string;
  version_id: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  original_filename: string;
}

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    // TODO: Make the values global
    this.cloudinary.config({
      cloud_name: 'ahoy-house',
      api_key: '##',
      api_secret: '##',
    });
  }

  async uploadImage(imagePath: string): Promise<CloudinaryResponse> {
    return await this.cloudinary.uploader.upload(
      imagePath,
      { folder: 'ahoy_house' },
      function (error, result) {
        // eslint-disable-next-line no-console
        console.log(result, error);
      },
    );
  }

  async deleteImage(publicId: string): Promise<{ result: string }> {
    return this.cloudinary.uploader.destroy(publicId, function (error, result) {
      // eslint-disable-next-line no-console
      console.log(result, error);
    });
  }
}
