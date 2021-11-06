/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

import { getToken } from '../Helpers';
import { styled } from '@mui/system';
import Listings from '../Components/Listings';

const token = getToken();

export default function Landing () {

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Listings/>
          </Grid>
          <Grid item xs={8}>
            xs=8
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
