/* eslint-disable */ 

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types'

import {
  getEmail,
} from '../Helpers'

const getReviewRating = (reviews) => {
  let sum = 0;
  let numReview = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += parseFloat(reviews[i].review);
    numReview += 1;
  }
  const rating = sum / numReview;
  console.log(rating);
  return rating;
}

const addReview = (value, details, setDetails) => {
  const reviews = details.reviews;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].email === getEmail()) {
      if (value != null) {
        reviews[i].review = value;
      } else {
        reviews.splice(i, i + 1);
      }
      
      setDetails({...details, reviews: reviews})
      return;
    }
  }
  const newReview = {
    email: getEmail(),
    review: value,
  }
  reviews.push(newReview);
  setDetails({...details, reviews: reviews})
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

export default function UserRating ({ readOnly, details, setDetails }) {
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
                addReview(newValue, details, setDetails);
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
