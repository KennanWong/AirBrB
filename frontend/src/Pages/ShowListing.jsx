/* eslint-disable */

import React from 'react';

import {
  Container,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { StyledThumbnail, ThumbnailImage } from '../Components/Styles';
import { useParams } from 'react-router';
import {
  getListingDetails,
} from '../Helpers';
import ListingDetailsBar from '../Components/ListingDetailsBar';
import { Bedrooms } from '../Components/Bedrooms';
import UserRating from '../Components/Rating';
import Ammenities from '../Components/Ammenities';
import { AddressString } from '../Components/Address';
import Booking from '../Components/Booking';

export default function ShowListing () {
  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    address: {
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    },
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: 0,
    beds: 0,
    bedroomsList: [],
    reviews: [],
    ammenities: [],
    availability: [],
  })
  const params = useParams();
  const id = params.id;
  React.useEffect(() => {
    getListingDetails(id, listingDetails, setListingDetails);
  }, [])

  console.log(listingDetails);

  return (
    <Container>
      <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <ThumbnailImage>
                  {(listingDetails.thumbnail !== '')
                    ? <StyledThumbnail src={listingDetails.thumbnail}/>
                    : <div>{listingDetails.title}</div>
                  }
                </ThumbnailImage>
              </Grid>
              <Grid item xs={7}>
                <h1>{listingDetails.title}</h1>
                <br/>
                <AddressString address={listingDetails.address}/>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider variant="middle"></Divider>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListingDetailsBar bedroomNum={listingDetails.bedroomsList.length} bathroomNum={listingDetails.bathrooms}/>
                  </ListItem>
                  <ListItem>
                    <h2>Entire {listingDetails.type}.</h2>
                  </ListItem>
                  <Divider/>
                  <ListItem>
                    <br/>
                    <Bedrooms isInput={false} bedroomNum={listingDetails.bedroomsList.length} listingDetails={listingDetails}/>
                    <br/>
                  </ListItem>
                  <Divider/>
                  <ListItem>
                    <Ammenities isInput={false} details={listingDetails} setListingDetails={setListingDetails}/>
                  </ListItem>
                  <Divider/>
                  <ListItem>
                    <UserRating listingId={id} readOnly={false} details={listingDetails} setDetails={setListingDetails}/>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <Booking id={id} isInput={false} listingDetails={listingDetails}/>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
  );
}
