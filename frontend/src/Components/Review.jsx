import React from 'react';

import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const ReviewCard = styled.div`
  background-color: #f5f5f5;
  width: 100%;
`;

Review.propTypes = {
  isInput: PropTypes.bool,
  listingDetails: PropTypes.object,
  review: PropTypes.object,
  setListingDetails: PropTypes.func,
}

export default function Review ({ isInput, review, listingDetails, setListingDetails }) {
  const [userReview, setUserReview] = React.useState = ({
    email: '',
    bookingId: '',
    rating: 0,
    comment: '',
  });

  const handleChange = (prop, value) => {
    setUserReview({ ...userReview, [prop]: value })
  }

  return (
    <ReviewCard>
      {(isInput)
        ? <Stack>
            <Typography variant="h6" gutterBottom component="div"> {review.email} </Typography>
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
              readOnly
              value={userReview.rating}
              onChange={(e, newValue) => {
                handleChange('rating', newValue);
              }}
              precision={0.5}
            />
            <Button variant={'contained'}>Submit Review</Button>
          </Stack>
        : <Stack>
            <Typography variant="h6" gutterBottom component="div"> {review.email} </Typography>
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
