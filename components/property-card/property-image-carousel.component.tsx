// @flow
import * as React from 'react';
import { CarouselButtons } from './carousel-buttons.component';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageData {
  id: string;
  imgUrl: string;
  alt: string;
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

type Props = {};
export const PropertyImageCarousel = (props: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [images, setImages] = useState<ImageData[]>(IMAGE_DATA);
  const size = images.length - 1;

  const prevItem = () => {
      const index = currentItem > 0 ? currentItem - 1 : size;
      setCurrentItem(index);
      console.log(currentItem)
  };

  const nextItem = () => {
    const index = currentItem >= size ? 0 : currentItem + 1;
    console.log(currentItem >= size)
    setCurrentItem(index);
  };

  return (
    <div>
      <section className='property-carousel'>
        {IMAGE_DATA.map((image, index) => (
          <Image
            className={`${index === currentItem ? 'slide active wrapper' : 'slide'}`}
            width={504}
            height={272}
            src={image.imgUrl}
            alt={image.alt}
            key={index}
          />
        ))}
      <CarouselButtons prevItem={prevItem} nextItem={nextItem} />
      </section>
    </div>
  );
};
