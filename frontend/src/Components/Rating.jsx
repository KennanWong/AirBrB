/* eslint-disable */ 

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types'

import {
  getEmail, getUserBooking, sendListingDetails,
} from '../Helpers'
import { List, ListItem } from '@mui/material';
import Review from './Review';

export const getReviewRating = (reviews) => {
  let sum = 0;
  let numReview = 0;
  let rating = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += parseFloat(reviews[i].rating);
    numReview += 1;
  }

  if (numReview !== 0) {
    rating = sum / numReview;
  }

  return rating;
}

const addReview = (listingId, value, details, setDetails) => {
  const reviews = details.reviews;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].email === getEmail()) {
      if (value != null) {
        reviews[i].review = value;
      } else {
        reviews.splice(i, 1);
      }
      setDetails({...details, reviews: reviews});
      sendListingDetails(false, listingId, details, null);
      return;
    }
  }
  if (getEmail() !== null) {
    const newReview = {
      email: getEmail(),
      review: value,
    }
    reviews.push(newReview);
    setDetails({...details, reviews: reviews});
    sendListingDetails(false, listingId, details, null);
  } else {
    alert('Login to leave a review');
  }
  
}


UserRating.propTypes = {
  readOnly: PropTypes.bool,
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

export default function UserRating ({ listingId, readOnly, details, setDetails }) {
  const [communityValue, setCommunityValue] = React.useState(getReviewRating(details.reviews));

  React.useEffect(() => {
    console.log('getting community rating');
    setCommunityValue(getReviewRating(details.reviews));
    console.log('details', details);
  }, [details])

  let canMakeReview = false;
  if (getEmail() !== null) {
    const booking = getUserBooking(details);
    if (booking !== null) {
      if (booking.status === 'accepted') {
        canMakeReview = true;
      } 
    }
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        width: '100%',
      }}
    >
      <Typography component="legend">Community Rating: {details.reviews.length} Reviews.</Typography>
      <Rating name="read-only" value={communityValue} readOnly precision={0.5}/>
      {!readOnly
        ? <List>
            { (canMakeReview)
              ? <ListItem><Review isInput={true} review = {null} listingDetails={details} setListingDetails={setDetails}/></ListItem>
              : <div></div>
            }
            {details.reviews.map((value, key) => {
              return  <ListItem key={key}>
                        <Review isInput={false} review={value} listingDetails={details} setListingDetails={setDetails}/>
                      </ListItem>
            })}
          </List>
        : <div></div>
      }

    </Box>
  );
}
