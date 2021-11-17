import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
/* eslint-disable*/
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

Calendar.propTypes = {
  isInput: PropTypes.bool,
  booking: PropTypes.object,
  listingDetails: PropTypes.object,
  handleChange: PropTypes.func,
}

export default function Calendar ({ isInput, booking, listingDetails, handleChange }) {
  const shouldDisableDate = (date) => {
    if (isInput) {
      return false;
    }
    if (listingDetails !== null) {
      const availability = listingDetails.availability;
      console.log(availability);
      for (let i = 0; i < availability.length; i++) {
        const reservation = availability[i];
        const dates = reservation.dateRange.dates;
        if (!(date >= dates[0] && date <= dates[1])) {
          return true;
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
