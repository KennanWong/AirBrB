import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';

import { ListingsBar } from '../Components/Styles';
import {
  getListings,
} from '../Helpers';
import Listing from '../Components/Listing';
import { useNavigate } from 'react-router';

export default function MyListings () {
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
        <ListingsBar>
          {listingsList.map((listing, key) => {
            return <Listing publicView={false} details={listing} key={key}/>
          })}
        </ListingsBar>
      </Box>
      <br/>
      <Divider></Divider>
      <br/>
      <Button variant="outlined" onClick={() => navigate('/createListing')}>
        Create new listing.
      </Button>
    </Container>
  );
}
