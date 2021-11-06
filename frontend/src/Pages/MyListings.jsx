/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { apiFetch, getEmail, getToken } from '../Helpers';
import Listings from '../Components/Listings';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { StyledLink } from '../Components/Styles';
import Listing from '../Components/Listing';

const token = getToken();

const getMyListings = async (listingsList, setListingsList) => {
  const ret = await apiFetch('GET', '/listings', null, {});
  const curListings = ret.listings
  console.log(curListings);
  for (const item in curListings) {
    const listing = curListings[item];
    console.log(listing);
    console.log(listing.owner);
    if (listing.owner == getEmail()) {
      setListingsList([...listingsList, listing]);
    }
    
  }
}

export default function MyListings () {
  const [listingsList, setListingsList] = React.useState([]);

  React.useEffect(() => {
    getMyListings(listingsList, setListingsList);
  }, []);

  return (
    <Container>
      <h1>My Listings</h1>
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
      <Button variant="outlined" >
        <StyledLink style={{ textDecoration: 'none' }} to="/createListing">
          Create new listing.
        </StyledLink>
      </Button>
    </Container>
  );
}