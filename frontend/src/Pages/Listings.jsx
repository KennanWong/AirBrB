import React from 'react';

import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';

import { apiFetch } from '../Helpers';
import Listing from '../Components/Listing';

const getListings = async (listingsList, setListingsList) => {
  const ret = await apiFetch('GET', '/listings', null, {});
  const curListings = ret.listings
  console.log(curListings);
  for (const item in curListings) {
    console.log(curListings[item]);
    setListingsList([...listingsList, curListings[item]]);
  }
}

export default function Listings () {
  const [listingsList, setListingsList] = React.useState([]);
  React.useEffect(() => {
    getListings(listingsList, setListingsList);
  }, []);
  console.log(listingsList);
  return (
    <Container>
      <h1>Listings</h1>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        {listingsList.map((listing, key) => (
          <Listing details={listing} key={key}></Listing>
        ))}
      </Box>
      <br/>
      <Divider></Divider>
      <br/>
    </Container>
  )
}
