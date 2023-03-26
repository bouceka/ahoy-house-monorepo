// @flow
import * as React from 'react';

import useWindowDimensions from '../../hooks/window-dimension';
import { Action } from '../action/action.component';

export const Hero = () => {
  const { width } = useWindowDimensions();

  return (
    <section className="hero">
      <div className="hero__container">
        <h2
          className={`display${width && width <= 900 ? "--small" : "--large"}`}
        >
          Make yourself at home You are always wanted
        </h2>
        <Action as="link" href="/properties" styleType="primary">
          Show properties
        </Action>
      </div>
    </section>
  );
};
