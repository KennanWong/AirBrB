import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';

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
