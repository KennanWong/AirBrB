
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Container,
  Divider,
  FormHelperText,
} from '@mui/material';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';

import React from 'react';
import { StyledThumbnail, ThumbnailImage } from '../Components/Styles';
import { apiFetch, fileToDataUrl, getToken } from '../Helpers';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const sendListingDetails = async (details, navigate) => {
  const body = {
    title: details.title,
    address: details.address,
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
    navigate('/myListings');
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
    if (event.target.value !== '') {
      console.log('updated value')
      setChangedState({ ...changedState, [prop]: true });
    } else {
      setChangedState({ ...changedState, [prop]: false });
    }
    setDetails({ ...details, [prop]: event.target.value });
  };

  const navigate = useNavigate();
  console.log(details);
  return (
    <div>
      Time to create a listing
      <Container>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <ThumbnailImage>
                  {(details.thumbnail !== '')
                    ? <div>
                       <StyledThumbnail src={details.thumbnail}/>
                      </div>
                    : <div>
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="raised-button-file"
                          multiple
                          type="file"
                          value={details.thumbnail}
                          onChange={async (e) => {
                            setDetails({ ...details, thumbnail: await fileToDataUrl(e.target.files[0]) })
                          }}
                        />
                        <label htmlFor="raised-button-file">
                          <Button variant="raised" component="span">
                            Upload
                          </Button>
                        </label>
                      </div>
                  }
                </ThumbnailImage>
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
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel>Stay Type</InputLabel>
                    <Select
                      value={details.type}
                      onChange={handleChange('type')}
                      label="Stay Type"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'House'}>House</MenuItem>
                      <MenuItem value={'Apartment'}>Apartment</MenuItem>
                      <MenuItem value={'Room'}>Room</MenuItem>
                    </Select>
                  </FormControl>
                  </ListItem>
                  <ListItem>
                    <TextField label="Number of bathrooms" type="number" onChange={handleChange('bathrooms')} variant="standard" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
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
              </Grid>
            </Grid>
          </Box>
        </Box>
        {enableBtn
          ? <Button variant="contained" onClick={(e) => sendListingDetails(details, navigate)}> Submit </Button>
          : <div>
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
