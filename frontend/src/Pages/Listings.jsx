/* eslint-disable */
import React from 'react';

import Box from '@mui/material/Box';
import { Container, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';  

import {
  getListings,
} from '../Helpers';
import Listing from '../Components/Listing';
import {
  ListingsBar, SpacedFlex
} from '../Components/Styles';
import SearchModal from '../Components/SearchModal';

export default function Listings () {
  const [listingsList, setListingsList] = React.useState([]);

  const [searchString, setSearchString] = React.useState('')

  React.useEffect(async () => {
    await getListings(false, listingsList, setListingsList, null);
    console.log('getting listings list');
  }, []);
  
  const search = async () => {
    await setListingsList([]);
    console.log(searchString);
    const params = {
      search: searchString,
      dates: null,
      price: null,
      bedrooms: null,
      rating: null,
    }
    await getListings(false, listingsList, setListingsList, params);
    // setSearchString(searchString);
  }
  console.log('listingsListNow',listingsList);
  return (
    <Container>
      <SpacedFlex>
        <h1>Listings</h1>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <SearchModal listingsList={listingsList} setListingsList={setListingsList}/>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Listings"
            inputProps={{ 'aria-label': 'search listings' }}
            value = {searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <IconButton sx={{ p: '10px' }} aria-label="search" onClick={(e) => search()}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </SpacedFlex>
      <Divider/>
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <ListingsBar>
          {listingsList.map((listing, key) => {
            return <Listing publicView={true} details={listing} key={key}></Listing>
          })}
        </ListingsBar>
        <br/>
      </Box>
      <br/>
      <Divider></Divider>
      <br/>
    </Container>
  )
}
