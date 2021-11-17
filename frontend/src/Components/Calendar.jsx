import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
/* eslint-disable*/
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';
import { apiFetch, getToken } from '../Helpers';
import { useParams } from 'react-router';

Calendar.propTypes = {
  isInput: PropTypes.bool,
  booking: PropTypes.object,
  listingDetails: PropTypes.object,
  handleChange: PropTypes.func,
}

export default function Calendar ({ isInput, booking, listingDetails, handleChange }) {
  const shouldDisableDate = async (date) => {
    if (isInput) {
      return false;
    }
    if (listingDetails !== null) {
      const availabilityList = listingDetails.availability;
      console.log(availabilityList);
      let from;
      let to;
      // Check if the date matches the listings availabilities
      for (let i = 0; i < availabilityList.length; i++) {
        const availability = availabilityList[i];
        const dates = availability.dates;
        from = new Date(dates[0]);
        to = new Date(dates[1])
        if (!(date >= from && date <= to)) {
          return true;
        }
      }

      // Check if the date does not coincide with a booking

      const ret = await apiFetch('GET', '/bookings', getToken(), {});
      const bookings = ret.bookings;
      const params = useParams();
      const id = params.id;
      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        if (booking.listingId === id) {
          const dates = booking.dateRange.dates;
          from = new Date(dates[0]);
          to = new Date(dates[1]);
          if (date >= from && date <= to) {
            return true;
          }
        }
      }
      
    }
    return false;
  }

  let startText;
  let endText;

  if (isInput) {
    startText = 'Start';
    endText = 'End';
  } else {
    startText = 'Check-in';
    endText = 'Check-out';
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText={startText}
        endText={endText}
        value={booking.dates}
        onChange={(newValue) => {
          handleChange('dates', newValue);
        }}
        calendars={1}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
        inputFormat={'dd/MM/yyyy'}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
}
