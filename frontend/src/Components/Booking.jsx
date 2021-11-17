/* eslint-disable */
import React from 'react';
import Button from '@mui/material/Button';


import { apiFetch, datediff, getToken } from '../Helpers';

import Calendar from './Calendar'
import { BookingsBox, CentredFlex } from './Styles';
import { Divider } from '@mui/material';

const makeBooking = async (id, booking) => {
  const body = {
    dateRange: {
      dates: booking.dates,
      numDays: booking.numDays,
    },
    totalPrice: booking.price,
  }

  console.log(await apiFetch('POST', `/bookings/new/${id}`, getToken(), body));

}

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
      <Calendar booking={booking} isInput={false} listingDetails={listingDetails} handleChange={handleChange}/>
      <br/>
      <Divider/>
      <br/>
      <CentredFlex>
        {(booking.numDays !== 0)
          ? <Button variant="contained" fullWidth onClick={() => makeBooking(id, booking)}> Book </Button>
          : <Button variant="contained" disabled fullWidth> Book </Button>
        }
      </CentredFlex>
    </BookingsBox>
  )
}
