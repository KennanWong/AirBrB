/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

import { getToken } from './Helpers';

const token = getToken();

export default function Landing () {

  return (
    <Container>
      Hello this is the landing page
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            xs=4
          </Grid>
          <Grid item xs={8}>
            xs=8
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
