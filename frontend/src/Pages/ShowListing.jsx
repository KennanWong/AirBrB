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

export default function ShowListing () {
  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    address: '',
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: 0,
    bedrooms: [],
  })
  const params = useParams();
  const id = params.id;
  React.useEffect(() => {
    getListingDetails(id, listingDetails, setListingDetails);
  }, [])

  console.log('listing details', listingDetails);

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
                <h2>{listingDetails.address}</h2>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider variant="middle"></Divider>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListingDetailsBar bedroomNum={listingDetails.bathrooms} bathroomNum={listingDetails.bathrooms}/>
                  </ListItem>
                  <ListItem>
                    <h2>Entire {listingDetails.type}.</h2>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <h5>${listingDetails.price} per night.</h5>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
  );
}
