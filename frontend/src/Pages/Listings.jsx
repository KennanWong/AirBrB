import React from 'react';

import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';

import {
  getListings,
} from '../Helpers';
import Listing from '../Components/Listing';
import {
  ListingsBar
} from '../Components/Styles';

export default function Listings () {
  const [listingsList, setListingsList] = React.useState([]);
  React.useEffect(() => {
    getListings(false, listingsList, setListingsList);
  }, []);
  console.log(listingsList);
  return (
    <Container>
      <h1>Listings</h1>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <ListingsBar>
          {listingsList.map((listing, key) => {
            return <Listing publicView={true} details={listing} key={key}></Listing>
          })}
        </ListingsBar>
      </Box>
      <br/>
      <Divider></Divider>
      <br/>
    </Container>
  )
}
