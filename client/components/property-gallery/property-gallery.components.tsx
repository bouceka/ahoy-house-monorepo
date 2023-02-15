// @flow
import * as React from 'react';
import { PropertyImageCarousel } from '../property-card/property-image-carousel.component';
import { PropertyImage } from '../../types/property';
type Props = {
images: PropertyImage[]
};
export const PropertyGallery = ({images}: Props) => {
	return (
		<div>
			<PropertyImageCarousel imageData={images} />
		</div>
	);
};
