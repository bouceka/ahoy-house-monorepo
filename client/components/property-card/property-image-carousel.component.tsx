// @flow
import * as React from 'react';
import { CarouselButtons } from './carousel-buttons.component';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { CarouselProgressBar } from './carousel-progress-bar.component';
import { ImageData } from './property-card.component';
import { PropertyImage } from '../../types/property';

type Props = {
  imageData: PropertyImage[];
  width?: string;
  height?: string;
};
export const PropertyImageCarousel = ({ imageData, height = '27.2rem', width = '50.4rem' }: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [images, setImages] = useState<PropertyImage[]>(imageData);
  const size = images.length - 1;

  const prevItem = () => {
    const index = currentItem > 0 ? currentItem - 1 : size;
    setCurrentItem(index);
    console.log(currentItem);
  };

  const nextItem = () => {
    const index = currentItem >= size ? 0 : currentItem + 1;
    console.log(currentItem >= size);
    setCurrentItem(index);
  };

  return (
    <div>
      <section className='property-carousel' style={{ height, width }}>
        {images.map((image, index) => (
          <Image
            className={`${index === currentItem ? 'slide active wrapper' : 'slide'}`}
            width={504}
            height={272}
            src={image.url}
            alt={image.alt}
            key={index}
          />
        ))}
        <CarouselProgressBar currentIndex={currentItem} size={size} />
        <CarouselButtons prevItem={prevItem} nextItem={nextItem} />
      </section>
    </div>
  );
};
