/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { apiFetch, getEmail, getToken } from '../Helpers';
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
  console.log('Getting listings')
  const ret = await apiFetch('GET', '/listings', null, {});
  const curListings = ret.listings
  for (const item in curListings) {
    const listing = curListings[item];
    if (listing.owner == getEmail()) {
      listingsList.push(listing);
    }
  }
  setListingsList([...listingsList]);
}

const ListingsContainer = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

export default function MyListings () {
  const [listingsList, setListingsList] = React.useState([]);

  React.useEffect(() => {
    getMyListings(listingsList, setListingsList);
  }, []);
  console.log(listingsList);
  return (
    <Container>
      <h1>My Listings</h1>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <ListingsContainer>
          {listingsList.map((listing, key) => {
            return <Listing details={listing} key={key}/>
          })}
        </ListingsContainer>
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