// @flow
import * as React from 'react';
import { Action } from '../action/action.component';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
};

export const CheckoutModal = ({
  open,
  onClose,
  title,
  desc,
  primaryAction,
  secondaryAction,
}: Props) =>
  !open ? null : (
    <div onClick={onClose} className='modal__overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modal__container'
      >
        <div className='modal'>
          <button className='modal__close-btn' onClick={onClose}>
            X
          </button>
          <div className='modal__content'>
            <h2 className='heading'>{title}</h2>
            <p className='paragraph--medium'>{desc}</p>
          </div>
          <div className='modal__btn-container'>
            <Action styleType='primary' onClick={primaryAction}>
              Submit
            </Action>
              <Action styleType='outline' onClick={secondaryAction}>
                Cancel
              </Action>
          </div>
        </div>
      </div>
    </div>
  );
