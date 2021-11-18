import React from 'react';

import Box from '@mui/material/Box';
import { Container, Divider, List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  Flex,
  SpacedFlex
} from '../Components/Styles';
import { apiFetch, checkDates, datediff, getListingDetails, getToken } from '../Helpers';
import { useParams } from 'react-router';
import Booking from '../Components/Booking';

export default function ManageBookings () {
  const params = useParams();
  const id = params.id;

  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    id: '',
    bookings: [],
  })

  React.useEffect(() => {
    getListingDetails(Number(id), listingDetails, setListingDetails);
  }, [])

  const [bookingsList, setBookingsList] = React.useState({
    pending: [],
    history: [],
    liveDays: 0,
    daysBooked: 0,
    profit: 0,
  })

  React.useEffect(async () => {
    console.log(listingDetails)
    const bookings = listingDetails.bookings;
    const historyTmp = [];
    const pendingTmp = [];
    let liveDays = 0;
    let daysBooked = 0;
    let profit = 0;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].status === 'pending') {
        if (!checkDates(bookings[i].dateRange.dates, listingDetails)) {
          await apiFetch('PUT', `/bookings/decline/${bookings[i].id}`, getToken(), {});
        } else {
          pendingTmp.push(bookings[i]);
        }
      } else {
        if (bookings[i].status === 'accepted') {
          profit += bookings[i].totalPrice;
        }
        console.log(bookings[i]);
        historyTmp.push(bookings[i]);
        daysBooked += bookings[i].dateRange.numDays;
      }
    }
    liveDays = datediff(new Date(listingDetails.postedOn), new Date());
    setBookingsList({ pending: pendingTmp, history: historyTmp, liveDays: liveDays, daysBooked: daysBooked, profit: profit })
  }, [listingDetails])

  return (
    <Container>
      <SpacedFlex>
        <h1>Manage {listingDetails.title} Bookings</h1>
      </SpacedFlex>
      <Flex>
        <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
          Listing live for: {bookingsList.liveDays} days.
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
          Days booked: {bookingsList.daysBooked} days.
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="body1" component="div">
          Profit: ${bookingsList.profit}
        </Typography>
      </Flex>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          Pending Bookings
        </Typography>
        <Divider/>
        <List>
          {bookingsList.pending.map((value, key) => {
            return (
              <ListItem key={key}>
                <Booking booking={value} isInput={true} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          Booking History
        </Typography>
        <Divider/>
        <List>
          {bookingsList.history.map((value, key) => {
            return (
              <ListItem key={key}>
                <Booking booking={value} isInput={false} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Container>
  )
}
