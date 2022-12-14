import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';

TextInput.propTypes = {
  errorStatus: PropTypes.bool,
  errorMsg: PropTypes.string,
  resetError: PropTypes.func,
  label: PropTypes.string,
  setState: PropTypes.func,
}

export default function TextInput ({ errorStatus, errorMsg, resetError, label, setState }) {
  return (
    <Box
      sx={{ m: 1 }}
    >
      {errorStatus
        ? <TextField
          id={{ label } + 'error'}
          fullWidth label={label} variant="outlined"
          onChange={(e) => resetError()}
          error
          helperText={ errorMsg}
          name={'error'}
        />
        : <TextField fullWidth label={label} variant="outlined" onChange={(e) => setState(e.target.value)} name={label}
        />
      }
    </Box>
  )
}
