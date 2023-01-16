// @flow 
import * as React from 'react';
import { PropertyImageCarousel } from './property-image-carousel.component';
type Props = {
    
};
export const PropertyCard = (props: Props) => {
    return (
        <div className='property-card'>
            <PropertyImageCarousel/>
        </div>
    );
};