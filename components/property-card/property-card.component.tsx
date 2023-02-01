// @flow
import * as React from 'react';
import { PropertyImageCarousel } from './property-image-carousel.component';
import Image from 'next/image';

export interface ImageData {
  id: string;
  imgUrl: string;
  alt: string;
}

export interface Property {
  id: string;
  images: ImageData[];
  title: string;
  rating: string;
  bedroomNo: number;
  bathroomNo: number;
  address: string;
  trimLevels: string[];
}

const IMAGE_DATA: ImageData[] = [
  {
    id: '1',
    imgUrl: '/static/illustrations/house.jpg',
    alt: 'Silver House',
  },
  {
    id: '2',
    imgUrl: '/static/illustrations/bedroom.jpg',
    alt: 'Silver House',
  },
  {
    id: '3',
    imgUrl: '/static/illustrations/livingroom.jpg',
    alt: 'Silver House',
  },
  {
    id: '4',
    imgUrl: '/static/illustrations/balcony.jpg',
    alt: 'Silver House',
  },
  {
    id: '5',
    imgUrl: '/static/illustrations/livingroom_2.jpg',
    alt: 'Silver House',
  },
];

export const PROPERTY_DATA: Property = {
  images: IMAGE_DATA,
  title: 'Silver House',
  rating: '4.3',
  bedroomNo: 4,
  bathroomNo: 2,
  address: '1234 E 54th Ave, Vancouver, BC',
  trimLevels: ['advanced', 'premium'],
  id: '1',
};

type Props = {};
export const PropertyCard = (props: Props) => {
  return (
    <div className='property-card'>
      <PropertyImageCarousel imageData={PROPERTY_DATA.images} />
      <div className='content'>
        <h4 className='heading--bold'>{PROPERTY_DATA.title}</h4>
        <p className='paragraph--large'>
          <Image src='/icons/star-intersect.svg' width='24' height='24' alt='' /> {PROPERTY_DATA.rating}
        </p>
        <p className='paragraph--medium'>
          {' '}
          <Image src='/icons/bed.svg' width='32' height='32' alt='' />
          {PROPERTY_DATA.bedroomNo}
        </p>
        <p className='paragraph--medium'>
          <Image src='/icons/bath.svg' width='32' height='32' alt='' />
          {PROPERTY_DATA.bathroomNo}
        </p>
        <p className='paragraph--small'>
          <Image src='/icons/venue/outline.svg' width='24' height='24' alt='' />
          {PROPERTY_DATA.address}
        </p>
      </div>
    </div>
  );
};
