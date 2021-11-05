/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput ({ errorStatus, errorMsg, resetError, label, setState }) {
  return (
    <Box
      sx={{ m: 1 }}
    >
      {errorStatus
        ? <TextField
          fullWidth label={label} variant="outlined"
          onChange={(e) => resetError()}
          error
          helperText={ errorMsg}
        />
        : <TextField fullWidth label={label} variant="outlined" onChange={(e) => setState(e.target.value)}
        />
      }
    </Box>
  )
}
