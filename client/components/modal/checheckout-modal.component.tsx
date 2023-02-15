// @flow
import * as React from 'react';
import { Action } from '../action/action.component';
import { Input } from '../input/input.component';

type Props = {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction?: () => void;
};

export const CheckoutModal = ({ open, onClose, primaryAction, secondaryAction }: Props) =>
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
            <h2 className='heading'>Checkout</h2>
            <p className='paragraph--medium'>
              To complete your order, please leave your contact information. Our team will contact you shortly{' '}
            </p>
            <Input label='First Name' placeholder='e.g. John'/>
            <Input label='Last Name' placeholder='e.g. Doe'/>
            <Input label='Email' type='email' placeholder='e.g. john.doe@mail.com'/>
            <Input label='Phone number' placeholder='e.g. 123 456 7890'/>
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
