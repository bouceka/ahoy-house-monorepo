// @flow
import * as React from 'react';
type Props = {
  size: number;
  currentIndex: number;
};
export const CarouselProgressBar = ({ size, currentIndex }: Props) => {
  return (
    <div className="carousel-progress-bar">
      {Array(size + 1)
        .fill(null)
        .map((dot, index) => (
          <span className={index === currentIndex ? 'active' : ''} key={index}></span>
        ))}
    </div>
  );
};
