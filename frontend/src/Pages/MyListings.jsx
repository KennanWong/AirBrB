/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';

import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { ListingsBar, StyledLink } from '../Components/Styles';
import {
  getListings,
} from '../Helpers';
import Listing from '../Components/Listing';

export default function MyListings () {
  const [listingsList, setListingsList] = React.useState([]);

  React.useEffect(() => {
    getListings(true, listingsList, setListingsList, null);
  }, []);
  console.log(listingsList);
  return (
    <Container>
      <h1>My Listings</h1>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <ListingsBar>
          {listingsList.map((listing, key) => {
            return <Listing publicView={false} details={listing} key={key}/>
          })}
        </ListingsBar>
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