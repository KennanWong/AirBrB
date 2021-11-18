/* eslint-disable */
import React from 'react';
import Button from '@mui/material/Button';


import { apiFetch, datediff, getEmail, getListingDetails, getToken, getUserBooking } from '../Helpers';

import Calendar from './Calendar'
import { BookingsBox, CentredFlex } from './Styles';
import { Divider } from '@mui/material';

const makeBooking = async (id, booking, listingDetails, setListingDetails) => {
  const body = {
    dateRange: {
      dates: booking.dates,
      numDays: booking.numDays,
    },
    totalPrice: booking.price,
  }

  const bookingID = await apiFetch('POST', `/bookings/new/${id}`, getToken(), body);

  alert('Succesfully made a booking');
  await getListingDetails(id, listingDetails, setListingDetails);
}

export default function MakeBooking ({ id, listingDetails, setListingDetails }) {
  const [booking, setBooking] = React.useState({ 
    dates: [null, null],
    price: 0,
    numDays: 0,
  })

  const [userBooking, setUserBooking] = React.useState(null);

  React.useEffect(() => {
    const tmp = getUserBooking(listingDetails);
    console.log(tmp);
    if (tmp !== null) {
      setUserBooking(tmp);
      setBooking({ ...booking, dates: tmp.dateRange.dates, price: tmp.totalPrice, numDays: tmp.dateRange.numDays });
    }
  }, [listingDetails])

  const handleChange = (prop, value) => {
    let tmp = booking[prop];
    tmp = value;
    let numDays = 0;
    if (tmp[0] !== null && tmp[1] !== null) {
      numDays = datediff(tmp[0], tmp[1]) + 1;
      console.log('numDays', numDays);
    }
    setBooking({ ...booking, [prop]:tmp, numDays: numDays, price: listingDetails.price * numDays});
  }
  
  let canMakeBooking = false;
  if (getToken() !== null) {
    canMakeBooking = true;
  }
  
  return (
    <BookingsBox>
      {(booking.numDays !== 0)
        ? <h3>${listingDetails.price * booking.numDays} for {booking.numDays} days.</h3>
        : <h3>${listingDetails.price} per night.</h3>
      }
      <Calendar booking={booking} isInput={false} listingDetails={listingDetails} handleChange={handleChange} readOnly={(userBooking !== null)}/>
      <br/>
      <Divider/>
      <br/>
      <CentredFlex>
        <SubmitButton booking={booking} userBooking={userBooking} id={id} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
      </CentredFlex>
    </BookingsBox>
  )
}

function SubmitButton({ id, booking, userBooking, listingDetails, setListingDetails }) {
  if (getToken() === null) {
    return (
      <Button variant="contained" disabled fullWidth> Login to make a booking </Button>
    )
  }

  // Check if dates have been booked by the user
  console.log(userBooking);
  if (userBooking !== null) {
    // User has a booking, display a button that is disabled showing status of booking
    if (userBooking.status === "pending") {
      console.log("Booking is pending");
      return (
        <Button variant="contained" disabled fullWidth> Pending </Button>
      )
    }
  } else {
    if (booking.numDays !== 0) {
      return (
        <Button variant="contained" fullWidth onClick={() => makeBooking(id, booking, listingDetails, setListingDetails)}> Book </Button>
      )
    } else {
      return (
        <Button variant="contained" disabled fullWidth> Book </Button>
      )
    }
  }
  return null;
}