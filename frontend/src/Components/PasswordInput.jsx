/* eslint-disable react/prop-types */
import React from 'react';

// import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { FormHelperText } from '@mui/material';

export default function PasswordInput ({ errorStatus, errorMsg, resetError, label, passwordField, setState }) {
  const handleClickShowPassword = () => {
    setState({
      ...passwordField,
      showPassword: !passwordField.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setState({ ...passwordField, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {errorStatus
        ? <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel error htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          type={passwordField.showPassword ? 'text' : 'password'}
          value={passwordField.password}
          onChange={(e) => resetError()}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordField.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          error
          />
          <FormHelperText error>
            {errorMsg}
          </FormHelperText>
        </FormControl>
        : <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          type={passwordField.showPassword ? 'text' : 'password'}
          value={passwordField.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {passwordField.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          />
        </FormControl>
      }
    </div>
  )
}
