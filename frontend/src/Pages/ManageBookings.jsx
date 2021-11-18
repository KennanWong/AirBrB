import React from 'react';

import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';

import {
  SpacedFlex
} from '../Components/Styles';
import { getListingDetails } from '../Helpers';
import { useParams } from 'react-router';

export default function ManageBookings () {
  const params = useParams();
  const id = params.id;

  const [listingDetails, setListingDetails] = React.useState({
    id: '',
    bookings: [],
  })

  React.useEffect(() => {
    getListingDetails(Number(id), listingDetails, setListingDetails);
  }, [])

  console.log(listingDetails);
  return (
    <Container>
      <SpacedFlex>
        <h1>Manage Bookings</h1>
      </SpacedFlex>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>

      </Box>
      <br/>
      <Divider/>
      <br/>
    </Container>
  )
}
