// @flow
import * as React from 'react';
import { Action } from '../action/action.component';
type Props = {};
export const Hero = (props: Props) => {
  return (
    <section className='hero'>
      <div className='hero__container'>
        <h2 className='display--large'>Make yourself at home You are always wanted</h2>
        <Action as='link' href='/properties' styleType='primary'>Show properties</Action>
      </div>
    </section>
  );
};
