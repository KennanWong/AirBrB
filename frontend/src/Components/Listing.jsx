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
  getListingDetails
} from '../Helpers.jsx'

export default function Listing ({ details }) {
  const [listingDetails, setListingDetails] = React.useState({
    title: '',
    address: '',
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: 0,
    bedrooms: [],
  })
  React.useEffect(() => {
    getListingDetails(details.id, listingDetails, setListingDetails);
  }, [])
  const navigate = useNavigate();
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => navigate(`/listing/${details.id}`)}>
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
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
