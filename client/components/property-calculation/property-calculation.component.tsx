// @flow
import * as React from 'react';
import { Input } from '../input/input.component';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Action } from '../action/action.component';
import { Property, Room } from '../../types/property';
import { CheckoutModal } from '../modal/checheckout-modal.component';
import { useState } from 'react';
type Props = {
  room: Room;
  property: Property;
};

export type FormValue = {
  noGuests: number;
  checkIn: string;
  checkOut: string;
};

export const PropertyCalculation = ({ room, property }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [calculation, setCalculation] = useState({
    noGuests: 0,
    checkIn: '',
    checkOut: '',
    price: 0,
    houseName: '',
  });
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const validationSchema = yup.object().shape({
    noGuests: yup.number().required('Number of guests is required').min(1),
    checkIn: yup
      .date()
      .required('Check in date is required')
      .default(() => new Date()),
    checkOut: yup
      .date()
      .required('Check out date is required')
      .when('checkIn', (checkIn, schema) => checkIn && schema.min(checkIn)),
  });

  const handleDateDifference = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const dateDifference = end.getTime() - start.getTime();
    return dateDifference / (1000 * 3600 * 24);
  };

  const handleRoomPriceForPeriod = (days: number, price: number) => days * price;
  const handleTaxProportion = (price: number) => Math.ceil(price * 0.12 * 100) / 100;

  const handleGetTomorrow = (day: string) => {
    const checkIn = new Date(day);
    const tomorrow = new Date(checkIn);
    tomorrow.setDate(checkIn.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <>
      <CheckoutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        primaryAction={() => setOpenModal(false)}
        secondaryAction={() => setOpenModal(false)}
        calculation={calculation}
      />

      <Formik
        initialValues={calculation}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          // TODO: Refactor -> duplication
          const roomPrice = handleRoomPriceForPeriod(
            handleDateDifference(values.checkIn, values.checkOut),
            room.pricePerNight
          );

          const tax = handleTaxProportion(roomPrice);
          const totalPrice = tax + roomPrice;
          try {
            console.log(values);
            setCalculation({
              checkIn: values.checkIn,
              checkOut: values.checkOut,
              noGuests: values.noGuests,
              price: totalPrice,
              houseName: property.name,
            });
            setOpenModal(true);
            // actions.resetForm();
          } catch (error) {
            console.log(values);
            actions.resetForm();
          }
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting, dirty, isValid, errors }) => {
          const roomPrice = handleRoomPriceForPeriod(
            handleDateDifference(values.checkIn, values.checkOut),
            room.pricePerNight
          );

          const tax = handleTaxProportion(roomPrice);
          const totalPrice = tax + roomPrice;
          return (
            <>
            <h3 className="heading">Rate</h3>
              <form onSubmit={handleSubmit}>
                <Input
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  value={values.checkIn}
                  required
                  name='checkIn'
                  type='date'
                  label='Check In'
                  placeholder='Check In'
                />
                <Input
                  disabled={!values.checkIn}
                  min={values.checkIn ? handleGetTomorrow(values.checkIn) : ''}
                  onChange={handleChange}
                  value={values.checkOut}
                  required
                  name='checkOut'
                  type='date'
                  label='Check Out'
                  placeholder='Check Out'
                />
                <Input
                  min={1}
                  max={room.capacity}
                  onChange={handleChange}
                  value={values.noGuests}
                  required
                  name='noGuests'
                  type='number'
                  label='Guests'
                  placeholder='Number of guests'
                />
                <div className='property-calculation__summary'>
                  <div className='paragraph--medium'>Room {!isValid || !dirty ? '$0' : `$${roomPrice}`}</div>
                  <div className='paragraph--medium'>GST/PST (12%) {!isValid || !dirty ? '$0' : `$${tax}`}</div>
                  <div className='paragraph--medium--bold'>Total {!isValid || !dirty ? '$0' : `$${totalPrice}`}</div>
                </div>
                <Action disabled={!isValid || !dirty} as='button' type='submit' styleType='primary'>
                  Submit
                </Action>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};
