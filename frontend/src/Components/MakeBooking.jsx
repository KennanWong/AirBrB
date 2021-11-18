import React from 'react';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import { Divider, List, ListItem, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropTypes from 'prop-types';

import { apiFetch, datediff, getListingDetails, getToken, getUserBooking } from '../Helpers';
import Calendar from './Calendar'
import { BookingsBox, CentredFlex } from './Styles';
import Booking from './Booking';

const makeBooking = async (id, booking, setBooking, listingDetails, setListingDetails) => {
  const body = {
    dateRange: {
      dates: booking.dates,
      numDays: booking.numDays,
    },
    totalPrice: booking.price,
  }

  await apiFetch('POST', `/bookings/new/${id}`, getToken(), body);

  alert('Succesfully made a booking');
  setBooking({
    dates: [null, null],
    price: 0,
    numDays: 0,
  })
  await getListingDetails(id, listingDetails, setListingDetails);
}

MakeBooking.propTypes = {
  id: PropTypes.string,
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

export default function MakeBooking ({ id, listingDetails, setListingDetails }) {
  const [booking, setBooking] = React.useState({
    dates: [null, null],
    price: 0,
    numDays: 0,
  })

  const [prevBooking, setPrevBooking] = React.useState([])

  React.useEffect(() => {
    const tmp = getUserBooking(listingDetails);
    console.log(tmp);
    setPrevBooking(tmp);
  }, [listingDetails])

  const handleChange = (prop, value) => {
    let tmp = booking[prop];
    tmp = value;
    let numDays = 0;
    if (tmp[0] !== null && tmp[1] !== null) {
      numDays = datediff(tmp[0], tmp[1]) + 1;
      console.log('numDays', numDays);
    }
    setBooking({ ...booking, [prop]: tmp, numDays: numDays, price: listingDetails.price * numDays });
  }

  return (
    <BookingsBox>
      {(booking.numDays !== 0)
        ? <h3>${listingDetails.price * booking.numDays} for {booking.numDays} days.</h3>
        : <h3>${listingDetails.price} per night.</h3>
      }
      <Calendar booking={booking} isInput={false} listingDetails={listingDetails} handleChange={handleChange} readOnly={false}/>
      <br/>
      <Divider/>
      <br/>
      <CentredFlex>
        <SubmitButton booking={booking} id={id} setBooking={setBooking} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
      </CentredFlex>
      <br/>
      <Divider/>
      <br/>
      {(prevBooking.length !== 0)
        ? <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Booking History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
              {prevBooking.map((value, key) => {
                return (
                  <ListItem key={key}>
                    <Booking booking={value} isInput={false}/>
                  </ListItem>
                )
              })}
              </List>
            </AccordionDetails>
          </Accordion>
        : <div></div>
      }
    </BookingsBox>
  )
}

function SubmitButton ({ id, booking, setBooking, listingDetails, setListingDetails }) {
  if (getToken() === null) {
    return (
      <Button variant="contained" disabled fullWidth> Login to make a booking </Button>
    )
  }

  if (booking.numDays !== 0) {
    return (
      <Button variant="contained" fullWidth onClick={() => makeBooking(id, booking, setBooking, listingDetails, setListingDetails)}> Book </Button>
    )
  } else {
    return (
      <Button variant="contained" disabled fullWidth> Book </Button>
    )
  }
}
