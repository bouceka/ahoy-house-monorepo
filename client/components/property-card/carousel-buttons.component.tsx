// @flow
import Image from 'next/image';
import * as React from 'react';
type Props = {
  nextItem: () => void;
  prevItem: () => void;
};
export const CarouselButtons = (props: Props) => {
  return (
    <div className="carousel-buttons">
      <button className="carousel-button left" onClick={props.prevItem}>
        <Image src="/icons/chevron/left.svg" width="32" height="32" alt="" />
      </button>
      <button className="carousel-button right" onClick={props.nextItem}>
        <Image src="/icons/chevron/right.svg" width="32" height="32" alt="" />
      </button>
    </div>
  );
};
