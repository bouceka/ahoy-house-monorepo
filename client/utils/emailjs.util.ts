import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';

export interface CheckoutEmail {
  noGuests: number;
  checkIn: string;
  checkOut: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const sendEmail = (emailData: any) => {
  emailjs
    .send(
      'service_o0s96du',
      'ahoy-house-checkout',
      emailData,
      'user_TyZBlYPi75Bh5IApRdRvV',
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
};
