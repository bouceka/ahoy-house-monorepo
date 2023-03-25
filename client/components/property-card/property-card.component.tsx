// @flow
import * as React from 'react';
import { PropertyImageCarousel } from './property-image-carousel.component';
import Image from 'next/image';
import { Action } from '../action/action.component';
import { Property } from '../../types/property';

type Props = {
  property: Property;
  index: number;
};
export const PropertyCard = ({ index, property }: Props) => {
  const upFromPerRoom =
    property.rooms.length > 0
      ? property.rooms.reduce((accumulator, price) =>
          accumulator.pricePerNight < price.pricePerNight ? accumulator : price
        ).pricePerNight
      : null;
  return (
    <div className='property-card'>
      <PropertyImageCarousel imageData={property.images} />
      <div className='property-card__content'>
        <div className='property-card__left'>
          <div className='property-card__row'>
            <h4 className='heading--bold'>{property.name}</h4>
          </div>
          <div className='property-card__row'>
            <div className='property-card__icon'>
              <div className='star-rating'>
                <div className='empty-stars'>
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <Image
                        style={{ margin: 0 }}
                        src='/icons/star-empty.svg'
                        key={index}
                        width='24'
                        height='24'
                        alt=''
                      />
                    ))}
                </div>
                <div className='filled-stars' style={{ width: `${property.rating * 20}%` }}>
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <Image
                        style={{ margin: 0 }}
                        src='/icons/star-filled.svg'
                        key={index}
                        width='24'
                        height='24'
                        alt=''
                      />
                    ))}
                </div>
              </div>
              <span className='paragraph--large'>{property.rating}</span>
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
        </div>
        <div className='property-card__right'>
          <div className='property-card__price-range'>
            {upFromPerRoom ? (
              <>
                <span className='property-card__price-range__first'>From</span>
                <span> {upFromPerRoom} CAD / night</span>
              </>
            ) : (
              <>
                <span className='property-card__price-range__first'>No room</span>
                <span> available</span>
              </>
            )}
          </div>
          <Action as='link' styleType='primary' href={`properties/${property.id}`}>
            Detail
          </Action>
        </div>
      </div>
    </div>
  );
};
