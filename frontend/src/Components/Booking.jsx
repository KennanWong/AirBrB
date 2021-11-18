import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, IconButton, Typography } from '@mui/material';
import { CentredFlex, SpacedFlex } from './Styles';

// MUI icons
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { apiFetch, getEmail, getListingDetails, getToken } from '../Helpers';

const BookingCard = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding 10px;
`;

Booking.propTypes = {
  booking: PropTypes.object,
  isInput: PropTypes.bool,
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

export default function Booking ({ booking, isInput, listingDetails, setListingDetails }) {
  const dates = [new Date(booking.dateRange.dates[0]), new Date(booking.dateRange.dates[1])];

  const onSubmit = async (decision) => {
    if (decision !== 'delete') {
      await apiFetch('PUT', `/bookings/${decision}/${booking.id}`, getToken(), {});
    } else {
      await apiFetch('DELETE', `/bookings/${booking.id}`, getToken(), {});
    }
    getListingDetails(listingDetails.id, listingDetails, setListingDetails);
  }

  return (
    <BookingCard>
      <Typography variant="h6" gutterBottom component="div">Booking#{booking.id} - {booking.owner}</Typography>
      <Divider/>
      <br/>
      <SpacedFlex>
        <div>
          <Typography variant="body1">Status: {booking.status}</Typography>
          <Typography variant="body1">Dates: {dates[0].toDateString()} to {dates[1].toDateString()}</Typography>
          <Typography variant="body1">Price: ${booking.totalPrice} </Typography>
        </div>
        { (isInput)
          ? <CentredFlex>
              <IconButton sx={{ color: '#c21924' }} onClick={() => onSubmit('decline')}>
                <ClearIcon/>
              </IconButton>
              <IconButton sx={{ color: '#12a334' }} onClick={() => onSubmit('accept')}>
                <CheckIcon/>
              </IconButton>
            </CentredFlex>
          : <div>
            {(booking.owner !== getEmail())
              ? <CentredFlex>
                  {(booking.status !== 'accepted')
                    ? <IconButton sx={{ color: '#c21924' }}>
                        <ClearIcon/>
                      </IconButton>
                    : <IconButton disabled>
                        <ClearIcon/>
                      </IconButton>
                  }
                  {(booking.status !== 'accepted')
                    ? <IconButton disabled>
                        <CheckIcon/>
                      </IconButton>
                    : <IconButton sx={{ color: '#12a334' }}>
                        <CheckIcon/>
                      </IconButton>
                  }
                </CentredFlex>
              : <div></div>
            }
            </div>
        }
      </SpacedFlex>
    </BookingCard>
  )
}
