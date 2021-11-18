import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
/* eslint-disable*/
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';
import { apiFetch, getToken, getUserBooking } from '../Helpers';
import { useParams } from 'react-router';

Calendar.propTypes = {
  isInput: PropTypes.bool,
  booking: PropTypes.object,
  listingDetails: PropTypes.object,
  handleChange: PropTypes.func,
}

export default function Calendar ({ isInput, booking, listingDetails, handleChange, readOnly}) {

  const shouldDisableDate = (date) => {
    if (isInput) {
      return false;
    }
    if (listingDetails !== null) {
      const availabilityList = listingDetails.availability;
      let from;
      let to;
      // Check if the date matches the listings availabilities
      let availableCheck = true;
      for (let i = 0; i < availabilityList.length; i++) {
        const dates = availabilityList[i];
        from = new Date(dates[0]);
        to = new Date(dates[1])
        if (date >= from) {
          console.log('date is later than from')
        }
        if (date <= to) {
          console.log('date is before to');
        }
        if (date >= from && date <= to) {
          console.log(from, 'vs', date, 'vs', to);
          availableCheck = false;
        }
      }
      if (availableCheck) {
        return availableCheck;
      }
      console.log('now checking bookings')

      // Check if the date does not coincide with a booking
      // const safe = checkPreviousBookings(date);
      const id = listingDetails.id;
      const bookings = listingDetails.bookings;
      const userBooking = getUserBooking(listingDetails);
      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        if (booking.listingId === id && booking !== userBooking) {
          const dates = booking.dateRange.dates;
          from = new Date(dates[0]);
          to = new Date(dates[1]);
          if (date > from && date < to) {
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
        onChange={async (newValue) => {
          await handleChange('dates', newValue);
        }}
        calendars={1}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField fullWidth {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField fullWidth {...endProps} />
          </React.Fragment>
        )}
        readOnly={readOnly}
        inputFormat={'dd/MM/yyyy'}
        shouldDisableDate={shouldDisableDate}
        error={false}
        disablePast
      />
    </LocalizationProvider>
  );
}
