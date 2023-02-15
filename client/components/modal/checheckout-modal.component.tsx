// @flow
import * as React from 'react';
import { Action } from '../action/action.component';
import { Input } from '../input/input.component';
import { Formik } from 'formik';
import * as yup from 'yup';
import { sendEmail } from '../../utils/emailjs.util';

type Props = {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction?: () => void;
  calculation: {
    noGuests: number;
    checkIn: string;
    checkOut: string;
    price: number;
  };
};

export const CheckoutModal = ({ open, onClose, primaryAction, secondaryAction, calculation }: Props) => {
  const initialValue = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().required('Check in date is required').email(),
    phoneNumber: yup.string().required('Phone number is required'),
  });
  return (
    <>
      {!open ? null : (
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
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {
                    console.log(values);
                    try {
                      console.log(values);
                      sendEmail({ ...calculation, ...values });
                      actions.resetForm();
                    } catch (error) {
                      onClose();
                      console.log(values);
                      actions.resetForm();
                    }
                  }}
                >
                  {({ values, handleSubmit, handleChange, isSubmitting, dirty, isValid, errors }) => {
                    return (
                      <>
                        <form onSubmit={handleSubmit}>
                          <Input
                            label='First Name'
                            onChange={handleChange}
                            value={values.firstName}
                            required
                            name='firstName'
                            placeholder='e.g. John'
                          />
                          <Input
                            label='Last Name'
                            onChange={handleChange}
                            value={values.lastName}
                            required
                            name='lastName'
                            placeholder='e.g. Doe'
                          />
                          <Input
                            label='Email'
                            type='email'
                            onChange={handleChange}
                            value={values.email}
                            required
                            name='email'
                            placeholder='e.g. john.doe@mail.com'
                          />
                          <Input
                            label='Phone number'
                            onChange={handleChange}
                            value={values.phoneNumber}
                            required
                            name='phoneNumber'
                            placeholder='e.g. 123 456 7890'
                          />
                          <div className='modal__btn-container'>
                            <Action disabled={!isValid || !dirty} as='button' type='submit' styleType='primary'>
                              Submit
                            </Action>
                            <Action styleType='outline' onClick={primaryAction}>
                              Cancel
                            </Action>
                          </div>
                        </form>
                      </>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
