import React from 'react';

import {
  Container,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { ThumbnailImage } from '../Components/Styles';
import { useParams } from 'react-router';
import { apiFetch } from '../Helpers';

const getListingDetails = async (id, listingDetails, setListingDetails) => {
  try {
    const ret = await apiFetch('GET', `/listings/${id}`, null, {});
    const listing = ret.listing;
    console.log(listing);

    setListingDetails({
      ...listingDetails,
      title: listing.title,
      address: listing.address,
      price: listing.price,
      thumbnail: '',
      type: listing.metadata.type,
      bathrooms: listing.metadata.bathrooms,
      bedrooms: [],
    })
    console.log(listingDetails);
  } catch (e) {
    alert(e);
  }
}

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
                <ThumbnailImage>Thumbnail</ThumbnailImage>
              </Grid>
              <Grid item xs={7}>
                <h1>{listingDetails.title}</h1>
                <br/>
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
                    <h4>Entire {listingDetails.type}.</h4>
                  </ListItem>
                  <ListItem>
                    <h4>{listingDetails.bathrooms} Bathrooms available</h4>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <h5>${listingDetails.price}</h5>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
  );
}
