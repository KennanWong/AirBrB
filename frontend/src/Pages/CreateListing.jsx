/* eslint-disable */ 
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Container,
  Divider,
  FormHelperText,
  IconButton,
} from '@mui/material';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import React from 'react';
import { SpacedFlex, StyledThumbnail, ThumbnailImage } from '../Components/Styles';
import { apiFetch, fileToDataUrl, getListingDetails, getToken, sendListingDetails } from '../Helpers';

import styled from 'styled-components';
// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';

import { Bedrooms } from '../Components/Bedrooms';
import Ammenities from '../Components/Ammenities';
import Address from '../Components/Address';

const DataEnty = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  padding-left: 15px;
  width: 100%;
`;

NumberOptions.propTypes = {
  num: PropTypes.number,
}
export function NumberOptions ({ num }) {
  const numList = [];
  for (let i = 0; i <= num; i++) {
    numList.push(i);
  }
  return (
    <div>
      {numList.map((value, key) => {
        return <MenuItem value={'1'} key={key}> {value}</MenuItem>
      })}
    </div>
  )
}

CreateListing.propTypes = {
  newListing: PropTypes.bool,
  listingId: PropTypes.number,
}

export default function CreateListing ({ newListing }) {

  const defaultState = {
    title: '',
    address: {
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    },
    price: 0,
    thumbnail: '',
    type: '',
    bathrooms: '',
    beds: '',
    bedroomsList: [],
    ammenities: [],
    public: false,
  };

  const [details, setDetails] = React.useState(defaultState);

  // If not a new listing, we are editing an existing one
  // Fill in existing details from the back end
  let id;
  if (!newListing) {
    const params = useParams();
    id = params.id;
    React.useEffect(() => {
      getListingDetails(id, details, setDetails);
    }, []);
  }

  let enableBtn = true;
  for (const item in details) {
    console.log(item);
    if (item !== 'address' && item !== 'public') {
      if (details[item] === defaultState[item]) {
        console.log(item, ' hasnt changed');
        enableBtn = false;
      }
    } else if (item === 'address') {
      const address = details.address;
      for (const field in address) {
        if ((field !== 'apartment') && (address[field] === defaultState.address[field])) {
          console.log(field, ' hasnt changed');
          enableBtn = false;
        }
      }
    }
  }

  const handleChange = (prop) => (event) => {
    if (prop === 'bathrooms' || prop === 'beds') {
      console.log('changing bathrooms');
      if (event.target.value < 0) {
        setDetails({ ...details, [prop]: '' });
      } else {
        setDetails({ ...details, [prop]: event.target.value });
      }
    } else if (prop === 'public') {
      setDetails({ ...details, [prop]: event.target.checked });
    }
    else {
      setDetails({ ...details, [prop]: event.target.value });
    }
  };
  const [toggleUpload, setToggleUpload] = React.useState((details.thumbnail === ''));

  const navigate = useNavigate();
  console.log(details);
  return (
    <div>
      <Container>
        <SpacedFlex>
          <Button variant='outlined' startIcon={<DeleteIcon/>}>
            Delete
          </Button>
          <FormControlLabel control={<Switch checked={details.public} onChange={handleChange('public')}/>} label="Publish Listing" labelPlacement='start'/>
        </SpacedFlex>
        <Box sx={{ my: 3, mx: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                {toggleUpload
                  ? <ThumbnailImage>
                      <StyledThumbnail
                        onMouseOver={() => {
                          setToggleUpload(false);
                          console.log('hovering');
                        }}
                        src={details.thumbnail}
                      />
                    </ThumbnailImage>
                  : <ThumbnailImage
                      onMouseOut={() => {
                        setToggleUpload(true);
                        console.log('moved away');
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        value={''}
                        onChange={async (e) => {
                          setDetails({ ...details, thumbnail: await fileToDataUrl(e.target.files[0]) })
                          setToggleUpload(true);
                        }}
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="raised"
                          component="span"
                        >
                          Upload
                        </Button>
                      </label>
                    </ThumbnailImage>
                }
              </Grid>
              <Grid item xs={7}>
                <DataEnty>
                  <TextField fullWidth label="Title" value={details.title || ''} onChange={handleChange('title')} variant="standard" />
                </DataEnty>
                <br/>
                <DataEnty>
                  <Address details={details} setDetails={setDetails}/>
                  {/* <TextField fullWidth label="Address" value={details.adress || ''} onChange={handleChange('address')} variant="standard" /> */}
                </DataEnty>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider variant="middle"></Divider>
        <Box sx={{ my: 3, mx: 2 }} fullWidth>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                  <ListItem>
                    <DataEnty>
                      <TextField value={details.bathrooms} label="Number of bathrooms" type="number" onChange={handleChange('bathrooms')} variant="standard" />
                    </DataEnty>
                  </ListItem>
                  <ListItem>
                    <DataEnty>
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
                    </DataEnty>
                  </ListItem>
                  <ListItem>
                    <DataEnty>
                      <h4>Bedrooms</h4>
                      <Bedrooms isInput={true} bedroomNum={details.bedroomsList.length} listingDetails={details} setListingDetails={setDetails}/>
                    </DataEnty>
                  </ListItem>
                  <ListItem>
                    <DataEnty>
                      <Ammenities isInput={true} details={details} setDetails={setDetails}/>
                    </DataEnty>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <DataEnty>
                      <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Price per night</InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          details={details.price}
                          value={details.price}
                          onChange={handleChange('price')}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          type="number"
                        />
                      </FormControl>
                    </DataEnty>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {newListing
          ? <SubmitButton enableBtn={enableBtn} details={details} navigate={navigate}/>
          : <SaveButton enableBtn={enableBtn} listingId={Number(id)} details={details} navigate={navigate}/>
        }
      </Container>
    </div>
  )
}

SubmitButton.propTypes = {
  enableBtn: PropTypes.bool,
  details: PropTypes.object,
  navigate: PropTypes.func,
}

function SubmitButton ({ enableBtn, details, navigate }) {
  return (
    <div>
      {enableBtn
        ? <Button variant="contained" onClick={(e) => sendListingDetails(true, null, details, navigate)}> Submit </Button>
        : <div>
            <Button variant="contained" disabled> Submit </Button>
            <FormHelperText error>
              Fields are still empty.
            </FormHelperText>
          </div>
      }
    </div>
  )
}

SaveButton.propTypes = {
  enableBtn: PropTypes.bool,
  listingId: PropTypes.number,
  details: PropTypes.object,
  navigate: PropTypes.func,
}

function SaveButton ({ enableBtn, listingId, details, navigate }) {
  return (
    <div>
      {enableBtn
        ? <Button variant="contained" onClick={(e) => sendListingDetails(false, listingId, details, navigate)}> Save Changes </Button>
        : <div>
            <Button variant="contained" disabled> Save Changes </Button>
            <FormHelperText error>
              Fields are still empty.
            </FormHelperText>
          </div>
      }
    </div>
  )
}
