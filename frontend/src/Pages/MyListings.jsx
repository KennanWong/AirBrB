import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';

import { ListingsBar, ListingsBarMobile } from '../Components/Styles';
import {
  getListings,
} from '../Helpers';
import Listing from '../Components/Listing';
import { useNavigate } from 'react-router';

import PropTypes from 'prop-types';

MyListings.propTypes = {
  mobileView: PropTypes.bool
}

export default function MyListings ({ mobileView }) {
  const [listingsList, setListingsList] = React.useState([]);

  const navigate = useNavigate();

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
        {(mobileView)
          ? <ListingsBarMobile>
              {listingsList.map((listing, key) => {
                return <Listing publicView={true} details={listing} key={key}></Listing>
              })}
            </ListingsBarMobile>
          : <ListingsBar>
              {listingsList.map((listing, key) => {
                return <Listing publicView={true} details={listing} key={key}></Listing>
              })}
            </ListingsBar>
        }
      </Box>
      <br/>
      <Divider></Divider>
      <br/>
      <Button label='Create' variant="outlined" onClick={() => navigate('/createListing')}>
        Create new listing.
      </Button>
    </Container>
  );
}
