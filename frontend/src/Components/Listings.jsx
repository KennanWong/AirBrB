import React from 'react';
import { apiFetch } from '../Helpers';
import Listing from './Listing';

const getListings = async (listingsList, setListingsList) => {
  const ret = await apiFetch('GET', '/listings', null, {});
  const curListings = ret.listings
  console.log(curListings);
  for (const item in curListings) {
    console.log(curListings[item]);
    setListingsList([...listingsList, curListings[item]]);
  }
}

export default function Listings () {
  const [listingsList, setListingsList] = React.useState([]);
  React.useEffect(() => {
    getListings(listingsList, setListingsList);
  }, []);

  console.log(listingsList);
  return (
    <div>
      Here are some listings
      {listingsList.map((listing, key) => (
        <Listing details={listing} key={key}></Listing>
      ))}
      <br/>
    </div>
  )
}
