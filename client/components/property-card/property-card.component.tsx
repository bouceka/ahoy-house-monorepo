// @flow
import * as React from 'react';
import { PropertyImageCarousel } from './property-image-carousel.component';
import Image from 'next/image';
import { Action } from '../action/action.component';

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
      <div className='property-card__content'>
        <h4 className='heading--bold'>{PROPERTY_DATA.title}</h4>
        <div className='property-card__row'>
          <div className='property-card__icon'>
            <Image src='/icons/star-intersect.svg' width='24' height='24' alt='' />
            <span className='paragraph--large'>{PROPERTY_DATA.rating}</span>
          </div>
        </div>
        <div className='property-card__row'>
          <div className='property-card__icon'>
            <Image src='/icons/bed.svg' width='32' height='32' alt='' />
            <span className='paragraph--medium'>{PROPERTY_DATA.bedroomNo} Bedrooms</span>
          </div>
          <div className='property-card__icon'>
            <Image src='/icons/bath.svg' width='32' height='32' alt='' />
            <span className='paragraph--medium'>{PROPERTY_DATA.bathroomNo} Bathrooms</span>
          </div>
        </div>
        <div className='property-card__icon'>
          <Image src='/icons/venue/outline.svg' width='24' height='24' alt='' />
          <span className='paragraph--small'>{PROPERTY_DATA.address}</span>
        </div>
        <Action as='link' styleType='primary' className='property-card__btn' href='#!'>
          Detail
        </Action>
      </div>
    </div>
  );
};