// @flow
import * as React from 'react';
import { PropertyImageCarousel } from './property-image-carousel.component';
import Image from 'next/image';
import { Action } from '../action/action.component';
import { Property } from '../../types/property';

// export interface ImageData {
//   id: string;
//   imgUrl: string;
//   alt: string;
// }

// export interface Property {
//   id: string;
//   images: ImageData[];
//   title: string;
//   rating: string;
//   bedroomNo: number;
//   bathroomNo: number;
//   address: string;
//   trimLevels: string[];
// }

// const IMAGE_DATA: ImageData[] = [
//   {
//     id: '1',
//     imgUrl: '/static/illustrations/house.jpg',
//     alt: 'Silver House',
//   },
//   {
//     id: '2',
//     imgUrl: '/static/illustrations/bedroom.jpg',
//     alt: 'Silver House',
//   },
//   {
//     id: '3',
//     imgUrl: '/static/illustrations/livingroom.jpg',
//     alt: 'Silver House',
//   },
//   {
//     id: '4',
//     imgUrl: '/static/illustrations/balcony.jpg',
//     alt: 'Silver House',
//   },
//   {
//     id: '5',
//     imgUrl: '/static/illustrations/livingroom_2.jpg',
//     alt: 'Silver House',
//   },
// ];

//  const PROPERTY_DATA: Property = {
//   images: IMAGE_DATA,
//   title: 'Silver House',
//   rating: '4.3',
//   bedroomNo: 4,
//   bathroomNo: 2,
//   address: '1234 E 54th Ave, Vancouver, BC',
//   trimLevels: ['advanced', 'premium'],
//   id: '1',
// };

type Props = {
  property: Property;
  index: number;
};
export const PropertyCard = ({ index, property }: Props) => {
  return (
    <div className='property-card'>
      <PropertyImageCarousel imageData={property.images} />
      <div className='property-card__content'>
        <div className='property-card__row'>
          <h4 className='heading--bold'>{property.name}</h4>
          <div className='property-card__icon'>
            <Image src='/icons/star-intersect.svg' width='24' height='24' alt='' />
            <span className='paragraph--large'>{'4.3'}</span>
          </div>
        </div>
        <div className='property-card__row'>
          <div className='property-card__icon'>
            <Image src='/icons/bed.svg' width='32' height='32' alt='' />
            <span className='paragraph--medium'>{property.numberRooms} Bedrooms</span>
          </div>
          <div className='property-card__icon'>
            <Image src='/icons/bath.svg' width='32' height='32' alt='' />
            <span className='paragraph--medium'>{property.numberBaths} Bathrooms</span>
          </div>
        </div>
        <div className='property-card__icon'>
          <Image src='/icons/venue/outline.svg' width='24' height='24' alt='' />
          <span className='paragraph--small'>{property.address}</span>
        </div>
        <Action as='link' styleType='primary' className='property-card__btn' href={`properties/${property.id}`}>
          Detail
        </Action>
      </div>
    </div>
  );
};
