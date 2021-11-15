/* eslint-disable */ 

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types'

import {
  getEmail, sendListingDetails,
} from '../Helpers'

export const getReviewRating = (reviews) => {
  let sum = 0;
  let numReview = 0;
  let rating = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += parseFloat(reviews[i].review);
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
        reviews.splice(i, i + 1);
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

const getUserRating = (reviews) => {
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].email === getEmail()) {
      console.log('Set user rating');
      console.log(reviews[i].review);
      return reviews[i].review;
    }
  }
  return 0;
}

UserRating.propTypes = {
  readOnly: PropTypes.bool,
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

export default function UserRating ({ listingId, readOnly, details, setDetails }) {
  const [value, setValue] = React.useState(getUserRating(details.reviews));
  const [communityValue, setCommunityValue] = React.useState(getReviewRating(details.reviews));

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Community Rating: {details.reviews.length} Reviews.</Typography>
      <Rating name="read-only" value={communityValue} readOnly precision={0.5}/>
      {!readOnly
        ? <div>
            <Typography component="legend">User Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                addReview(listingId, newValue, details, setDetails);
                setCommunityValue(getReviewRating(details.reviews));
                setValue(newValue);
              }}
              precision={0.5}
            />
          </div>
        : <div></div>
      }

    </Box>
  );
}
