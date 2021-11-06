/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

import { getToken } from '../Helpers';
import { styled } from '@mui/system';
import Listings from './Listings';

const token = getToken();

export default function Landing () {

  return (
    <Container>
      <Listings/>
    </Container>
  );
}
