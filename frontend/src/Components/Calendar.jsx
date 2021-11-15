import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

Calendar.propTypes = {
  booking: PropTypes.object,
  handleChange: PropTypes.func,
}

export default function Calendar ({ booking, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
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
      />
    </LocalizationProvider>
  );
}
