
import React from 'react';

import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';

Address.propTypes = {
  details: PropTypes.object,
  setDetails: PropTypes.func,
}

export default function Address ({ details, setDetails }) {
  const address = details.address;
  const handleAddressChange = (prop) => (event) => {
    const newAddress = details.address;
    newAddress[prop] = event.target.value;
    setDetails({ ...details, address: newAddress });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth label="Street Address" value={address.streetAddress || ''} onChange={handleAddressChange('streetAddress')} variant="standard" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Apartment" value={address.apartment || ''} onChange={handleAddressChange('apartment')} variant="standard" />
      </Grid>
      <Grid item xs={7}>
        <TextField fullWidth label="City" value={address.city || ''} onChange={handleAddressChange('city')} variant="standard" />
      </Grid>
      <Grid item xs={5}>
        <TextField fullWidth label="Post Code" value={address.postcode || ''} onChange={handleAddressChange('postcode')} variant="standard" />
      </Grid>
      <Grid item xs={5}>
      <TextField fullWidth label="State" value={address.state || ''} onChange={handleAddressChange('state')} variant="standard" />
      </Grid>
      <Grid item xs={7}>
        <TextField fullWidth label="Country" value={address.country || ''} onChange={handleAddressChange('country')} variant="standard" />
      </Grid>
    </Grid>
  )
}

AddressString.propTypes = {
  address: PropTypes.object,
}

export function AddressString ({ address }) {
  console.log('address', address);
  return (
    <div>
      {(address.apartment !== '')
        ? <h2>
          {address.apartment}, {address.streetAddress}, {address.city}, {address.postcode}, {address.state}, {address.country}
        </h2>
        : <h2>
          {address.streetAddress}, {address.city}, {address.postcode}, {address.state}, {address.country}
        </h2>
      }
    </div>
  )
}
