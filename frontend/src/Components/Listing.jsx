/* eslint-disable */

import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ListingDetailsBar from './ListingDetailsBar';

import {
  getEmail,
  getListingDetails
} from '../Helpers.jsx'
import UserRating from './Rating';

export default function Listing ({ publicView, details }) {
  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    address: '',
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: 0,
    bedrooms: [],
    reviews: [],
    ammenities: [],
  })
  React.useEffect(() => {
    getListingDetails(details.id, listingDetails, setListingDetails);
  }, [])
  const navigate = useNavigate();

  const navigateTo = () => {
    if (details.owner === getEmail() && !publicView) {
      navigate(`/editListing/${details.id}`)
    } else {
      navigate(`/listing/${details.id}`)
    }
    
  }

  return (
    <div>
      <Card sx={{ minWidth: 345 }}>
        <CardActionArea onClick={() => navigateTo()}>
          { (listingDetails.thumbnail !== '')
            ? <CardMedia
                component="img"
                height="140"
                src={listingDetails.thumbnail}
                alt={listingDetails.title}
              />
            : <CardMedia
                component="img"
                height="140"
                image={".../Images/home-icon.png"}
                alt={listingDetails.title}
              />
          }
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {listingDetails.title}  
            </Typography>
            <ListingDetailsBar bathroomNum={Number(listingDetails.bathrooms)} bedroomNum={Number(listingDetails.beds)}/> 
            <h3>Entire {listingDetails.type}. </h3>
            <h4> ${listingDetails.price} per night.</h4>
            <UserRating readOnly={true} details={listingDetails} setDetails={setListingDetails}/> 
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
