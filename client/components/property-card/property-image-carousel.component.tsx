// @flow
import Image from 'next/image';
import * as React from 'react';
import { useRef, useState } from 'react';

import { PropertyImage } from '../../types/property';
import { CarouselButtons } from './carousel-buttons.component';
import { CarouselProgressBar } from './carousel-progress-bar.component';

type Props = {
  imageData: PropertyImage[];
  width?: string;
  height?: string;
};
export const PropertyImageCarousel = ({ imageData, height, width }: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [images, setImages] = useState<PropertyImage[]>(imageData);
  const size = images.length - 1;

  const prevItem = () => {
    const index = currentItem > 0 ? currentItem - 1 : size;
    setCurrentItem(index);
  };

  const nextItem = () => {
    const index = currentItem >= size ? 0 : currentItem + 1;
    setCurrentItem(index);
  };

  return (
    <div>
      <section className="property-carousel" style={{ height, width }}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <Image
              className={`${index === currentItem ? 'slide active wrapper' : 'slide'}`}
              width={504}
              height={272}
              src={image.url}
              alt="Property photo"
              key={image.id}
            />
          ))
        ) : (
          <Image
            alt="no photo"
            className="active slide"
            width={504}
            height={272}
            key="unique-id"
            src="/static/illustrations/no-photo.jpeg"
          />
        )}
        {images.length > 1 ? (
          <>
            <CarouselProgressBar currentIndex={currentItem} size={size} />
            <CarouselButtons prevItem={prevItem} nextItem={nextItem} />
          </>
        ) : null}
      </section>
    </div>
  );
};
