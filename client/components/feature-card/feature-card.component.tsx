// @flow
import Image from 'next/image';
import * as React from 'react';
type Props = {
  imgUrl: string;
  alt: string;
  title: string;
  description: string;
};
export const FeatureCard = (props: Props) => {
  return (
    <article className="feature-card">
      <Image width={352} height={200} alt={props.alt} src={props.imgUrl} />
      <h5 className="heading--bold">{props.title}</h5>
      <p className="paragraph--large">{props.description}</p>
    </article>
  );
};
