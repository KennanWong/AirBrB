/* eslint-disable */
import React from 'react';
import { datediff } from '../Helpers';

import Calendar from './Calendar'
import { BookingsBox } from './Styles';

export default function Booking ({ id, listingDetails }) {
  const [booking, setBooking] = React.useState({
    dates: [null, null],
    price: 0,
    numDays: 0,
  })

  const handleChange = (prop, value) => {
    let tmp = booking[prop];
    tmp = value;
    let numDays = 0;
    if (tmp[0] !== null && tmp[1] !== null) {
      numDays = datediff(tmp[0], tmp[1]);
      console.log('numDays', numDays);
    }
    setBooking({ ...booking, [prop]:tmp, ['numDays']: numDays });
    
  }

  console.log('booking', booking);
  if (booking.dates[0] !== null) {
    console.log('startDate', booking.dates[0].getDate());
  }
  if (booking.dates[1] !== null) {
    console.log('endDate', booking.dates[1].getDate());
  }
  

  return (
    <BookingsBox>
      {(booking.numDays !== 0)
        ? <h3>${listingDetails.price * booking.numDays} for {booking.numDays} days.</h3>
        : <h3>${listingDetails.price} per night.</h3>
      }
      <Calendar booking={booking} handleChange={handleChange}/>
    </BookingsBox>
  )
}
