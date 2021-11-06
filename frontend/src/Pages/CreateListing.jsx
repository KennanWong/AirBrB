/* eslint-disable */
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Container, Divider } from '@mui/material';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FormHelperText } from '@mui/material';

import React from 'react';
import { ThumbnailImage } from '../Components/Styles';
import { apiFetch, getToken } from '../Helpers';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const sendListingDetails = async (details) => {
  const body = {
    title: details.title,
    address: details.address ,
    price: details.price,
    thumbnail: details.thumbnail,
    metadata: {
      bathrooms: details.bathrooms,
      type: details.type,
      bedrooms: details.bedrooms,
    }
  }
  try {
    const ret = await apiFetch('POST', '/listings/new', getToken(), body);
    console.log(ret);
  } catch (e) {
    alert(e)
  }
}

export default function CreateListing () {
  const defaultState = {
    title: '',
    address: '',
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: 0,
    bedrooms: [],
  };

  const [details, setDetails] = React.useState(defaultState);
  const [changedState, setChangedState] = React.useState({
    title: false,
    address: false,
    price: false,
    type: false,
    bathrooms: false,
  })

  let enableBtn = true;
  for (const item in changedState) {
    console.log(changedState[item]);
    if (!changedState[item]) {
      enableBtn = false;
    }
  }

  const handleChange = (prop) => (event) => {
    if (event.target.value != '') {
      console.log('updated value')
      setChangedState({...changedState, [prop]: true});
    } else {
      setChangedState({...changedState, [prop]: false});
    }
    setDetails({ ...details, [prop]: event.target.value });
  };

  console.log(details)

  return (
    <div>
      Time to create a listing
      <Container>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <ThumbnailImage>Thumbnail</ThumbnailImage>
              </Grid>
              <Grid item xs={7}>
                <TextField fullWidth label="Title" onChange={handleChange('title')} variant="standard" />
                <br/>
                <br/>
                <TextField fullWidth label="Address" onChange={handleChange('address')} variant="standard" />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider variant="middle"></Divider>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="standard-adornment-amount">Price per night</InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        details={details.price}
                        onChange={handleChange('price')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <TextField label="Type" onChange={handleChange('type')} variant="standard" />
                  </ListItem>
                  <ListItem>
                    <TextField label="Number of bathrooms" type="number" onChange={handleChange('bathrooms')} variant="standard" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <Item>Pricing and Availabilities</Item>
              </Grid>
            </Grid>
          </Box>
        </Box> 
        {enableBtn
          ? <Button variant="contained" onClick={(e) => sendListingDetails(details)}> Submit </Button>
          :<div>
            <Button variant="contained" disabled> Submit </Button>
            <FormHelperText error>
              Fields are still empty.
            </FormHelperText>
          </div>
        }
      </Container>
    </div>
  )
}
