import React from 'react';

import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

import {
  apiFetch,
  getEmail, getListingDetails, getToken, getUserBooking
} from '../Helpers'

const ReviewCard = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  padding: 15px;
  border-radius: 15px;
`;

Review.propTypes = {
  isInput: PropTypes.bool,
  listingDetails: PropTypes.object,
  review: PropTypes.object,
  setListingDetails: PropTypes.func,
}

const submitReview = async (userReview, listingDetails, setListingDetails, setUserReview) => {
  const body = {
    review: userReview,
  }
  await apiFetch('PUT', `/listings/${listingDetails.id}/review/${userReview.bookingId}`, getToken(), body);
  setUserReview({ ...userReview, rating: 0, comment: '' })
  getListingDetails(listingDetails.id, listingDetails, setListingDetails);
}

export default function Review ({ isInput, review, listingDetails, setListingDetails }) {
  const [userReview, setUserReview] = React.useState({
    email: '',
    bookingId: '',
    rating: 0,
    comment: '',
  });

  React.useEffect(() => {
    const bookings = getUserBooking(listingDetails);
    if (bookings.length !== 0) {
      setUserReview({ ...userReview, email: getEmail(), bookingId: bookings[0].id })
    }
  }, []);

  const handleChange = (prop, value) => {
    setUserReview({ ...userReview, [prop]: value });
  }

  return (
    <ReviewCard>
      {(isInput)
        ? <Stack spacing={2}>
            <Typography variant="h6" gutterBottom component="div"> {userReview.email} - Booking#: {userReview.bookingId} </Typography>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              fullWidth
              onChange={(e) => {
                handleChange('comment', e.target.value);
              }}
            />
            <Rating
              value={userReview.rating}
              onChange={(e, newValue) => {
                handleChange('rating', newValue);
              }}
              precision={0.5}
            />
            <Button variant={'contained'} onClick={() => submitReview(userReview, listingDetails, setListingDetails, setUserReview)}>Submit Review</Button>
          </Stack>
        : <Stack spacing={2}>
            <Typography variant="h6" gutterBottom component="div"> {review.email} - Booking#: {review.bookingId}</Typography>
            <Typography variant="body2" gutterBottom> {review.comment} </Typography>
            <Rating
              readOnly
              value={review.rating}
              precision={0.5}
            />
          </Stack>

      }
    </ReviewCard>
  )
}
