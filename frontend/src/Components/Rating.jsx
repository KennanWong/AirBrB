import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types'

import {
  getEmail, getUserBooking,
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

UserRating.propTypes = {
  listingId: PropTypes.string,
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
    const bookings = getUserBooking(details);
    if (bookings.length !== 0) {
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].status === 'accepted') {
          canMakeReview = true;
        }
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
              return <ListItem key={key}>
                      <Review isInput={false} review={value} listingDetails={details} setListingDetails={setDetails}/>
                    </ListItem>
            })}
          </List>
        : <div></div>
      }

    </Box>
  );
}
