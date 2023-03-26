// @flow
import * as React from 'react';

import { PropertyImage } from '../../types/property';
import { PropertyImageCarousel } from '../property-card/property-image-carousel.component';
type Props = {
  images: PropertyImage[];
};
export const PropertyGallery = ({ images }: Props) => {
  return (
    <div>
      <PropertyImageCarousel imageData={images} />
    </div>
  );
};
