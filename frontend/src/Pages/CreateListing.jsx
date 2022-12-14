import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Container,
  Divider,
  FormHelperText,
  IconButton,
  Stack,
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
import { CentredFlex, SpacedFlex, StyledThumbnail, ThumbnailImage } from '../Components/Styles';
import { apiFetch, fileToDataUrl, getListingDetails, getToken, sendListingDetails } from '../Helpers';

import styled from 'styled-components';
// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';

import { Bedrooms } from '../Components/Bedrooms';
import Ammenities from '../Components/Ammenities';
import Address from '../Components/Address';

import home from '../Images/home.png';
import Availability from '../Components/Availability';

const DataEnty = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  padding-left: 15px;
  width: 100%;
`;

const onDelete = async (id, navigate) => {
  await apiFetch('DELETE', `/listings/${id}`, getToken(), {});
  navigate('/myListings');
}

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
  mobileView: PropTypes.bool,
  newListing: PropTypes.bool,
}

export default function CreateListing ({ mobileView, newListing }) {
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
    thumbnail: home,
    type: '',
    bathrooms: '',
    beds: '',
    bedroomsList: [],
    ammenities: [],
    availability: [],
    published: false,
  };

  const [details, setDetails] = React.useState({ ...defaultState, type: 'House' });

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
    if (item !== 'address' && item !== 'published') {
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

  const handleChange = (prop) => async (event) => {
    if (prop === 'bathrooms' || prop === 'beds') {
      console.log('changing bathrooms');
      if (event.target.value < 0) {
        setDetails({ ...details, [prop]: '' });
      } else {
        setDetails({ ...details, [prop]: event.target.value });
      }
    } else if (prop === 'published') {
      setDetails({ ...details, [prop]: event.target.checked });
      if (event.target.checked) {
        const availabilities = details.availability;
        console.log('Availabilities: ', availabilities);
        if (availabilities[0][0] !== null && availabilities[0][1] !== null) {
          const body = {
            availability: details.availability,
          }
          await apiFetch('PUT', `/listings/publish/${id}`, getToken(), body);
        } else {
          alert('Please provide availabilities before publishing');
          setDetails({ ...details, [prop]: !event.target.checked });
        }
      } else {
        await apiFetch('PUT', `/listings/unpublish/${id}`, getToken(), null);
      }
    } else {
      setDetails({ ...details, [prop]: event.target.value });
    }
  };
  const [toggleUpload, setToggleUpload] = React.useState((details.thumbnail !== ''));

  const addAvailability = () => {
    const availabilityList = details.availability;
    availabilityList.push([null, null]);
    setDetails({ ...details, availability: availabilityList });
  }

  const removeAvailability = (i) => {
    const availabilityList = details.availability;
    availabilityList.splice(i, 1);
    setDetails({ ...details, availability: availabilityList });
  }

  console.log('mobileview in create listing: ', mobileView);
  const navigate = useNavigate();
  return (
    <div>
      {(mobileView)
        ? <Container>
            <SpacedFlex>
              <Button
                variant='outlined'
                startIcon={<DeleteIcon/>}
                disabled={newListing}
                onClick={() => onDelete(details.id, navigate)}
              >
                Delete
              </Button>
              <FormControlLabel
                control={<Switch checked={details.published} onChange={handleChange('published')}/>}
                label="Publish Listing"
                labelPlacement='start'
                disabled={newListing}
              />
            </SpacedFlex>
            <Stack spacing={1}>
              {toggleUpload
                ? <ThumbnailImage name='placeHolderThumb'>
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
                      name="thumbUpload"
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
              <DataEnty>
                <TextField fullWidth name='Title' label="Title" value={details.title || ''} onChange={handleChange('title')} variant="standard" />
              </DataEnty>
              <DataEnty>
                <Address details={details} setDetails={setDetails}/>
                {/* <TextField fullWidth label="Address" value={details.adress || ''} onChange={handleChange('address')} variant="standard" /> */}
              </DataEnty>
              <Divider variant="middle"></Divider>
              <DataEnty>
                <TextField name="Bathrooms" value={details.bathrooms} label="Number of bathrooms" type="number" onChange={handleChange('bathrooms')} variant="standard" />
              </DataEnty>
              <DataEnty>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel>Stay Type</InputLabel>
                  <Select
                    name="StayType"
                    value={details.type}
                    onChange={handleChange('type')}
                    label="Stay Type"
                  >
                    <MenuItem value={'House'}>House</MenuItem>
                    <MenuItem value={'Apartment'}>Apartment</MenuItem>
                    <MenuItem value={'Room'}>Room</MenuItem>
                  </Select>
                </FormControl>
              </DataEnty>
              <DataEnty>
                <h4>Bedrooms</h4>
                <Bedrooms isInput={true} bedroomNum={details.bedroomsList.length} listingDetails={details} setListingDetails={setDetails}/>
              </DataEnty>
              <DataEnty>
                <Ammenities isInput={true} details={details} setDetails={setDetails}/>
              </DataEnty>
              <DataEnty>
                <FormControl variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Price per night</InputLabel>
                  <Input
                    name="Price"
                    id="standard-adornment-amount"
                    details={details.price}
                    value={details.price}
                    onChange={handleChange('price')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    type="number"
                  />
                </FormControl>
                {(!newListing)
                  ? <div>
                      <br/>
                      <Divider/>
                      <br/>
                      <List sx={{ padding: '0px' }}>
                      {details.availability.map((value, key) => {
                        return <ListItem key={key}>
                                  <div>
                                    <Availability index={key} listingDetails={details} setListingDetails={setDetails} published={details.published}/>
                                    {(details.published)
                                      ? <div></div>
                                      : <CentredFlex>
                                          <IconButton onClick={() => removeAvailability(key)}>
                                            <DeleteIcon/>
                                          </IconButton>
                                        </CentredFlex>
                                    }
                                  </div>
                                </ListItem>
                      })}
                      </List>
                      <br/>
                      <Divider/>
                      <br/>
                      { (details.published)
                        ? <CentredFlex>
                            <Button fullWidth variant="contained" disabled> Unpublish To Modify</Button>
                          </CentredFlex>
                        : <CentredFlex>
                            <Button name="addAvailability" variant="contained" onClick={() => addAvailability()}>Add Availability</Button>
                          </CentredFlex>
                      }
                    </div>
                  : <div></div>
                }
              </DataEnty>
              {newListing
                ? <SubmitButton enableBtn={enableBtn} details={details} navigate={navigate}/>
                : <SaveButton enableBtn={enableBtn} listingId={Number(id)} details={details} navigate={navigate}/>
              }
            </Stack>
          </Container>
        : <Container>
            <SpacedFlex>
              <Button
                variant='outlined'
                startIcon={<DeleteIcon/>}
                disabled={newListing}
                onClick={() => onDelete(details.id, navigate)}
              >
                Delete
              </Button>
              <FormControlLabel
                control={<Switch checked={details.published} onChange={handleChange('published')}/>}
                label="Publish Listing"
                labelPlacement='start'
                disabled={newListing}
              />
            </SpacedFlex>
            <Box sx={{ my: 3, mx: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    {toggleUpload
                      ? <ThumbnailImage name='placeHolderThumb'>
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
                            name="thumbUpload"
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
                      <TextField fullWidth name='Title' label="Title" value={details.title || ''} onChange={handleChange('title')} variant="standard" />
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
                <Grid container >
                  <Grid item xs={8}>
                    <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                      <ListItem>
                        <DataEnty>
                          <TextField name="Bathrooms" value={details.bathrooms} label="Number of bathrooms" type="number" onChange={handleChange('bathrooms')} variant="standard" />
                        </DataEnty>
                      </ListItem>
                      <ListItem>
                        <DataEnty>
                          <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel>Stay Type</InputLabel>
                            <Select
                              name="StayType"
                              value={details.type}
                              onChange={handleChange('type')}
                              label="Stay Type"
                            >
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
                              name="Price"
                              id="standard-adornment-amount"
                              details={details.price}
                              value={details.price}
                              onChange={handleChange('price')}
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              type="number"
                            />
                          </FormControl>
                          {(!newListing)
                            ? <div>
                                <br/>
                                <Divider/>
                                <br/>
                                <List sx={{ padding: '0px' }}>
                                {details.availability.map((value, key) => {
                                  return <ListItem key={key}>
                                            <div>
                                              <Availability index={key} listingDetails={details} setListingDetails={setDetails} published={details.published}/>
                                              {(details.published)
                                                ? <div></div>
                                                : <CentredFlex>
                                                    <IconButton onClick={() => removeAvailability(key)}>
                                                      <DeleteIcon/>
                                                    </IconButton>
                                                  </CentredFlex>
                                              }
                                            </div>
                                          </ListItem>
                                })}
                                </List>
                                <br/>
                                <Divider/>
                                <br/>
                                { (details.published)
                                  ? <CentredFlex>
                                      <Button fullWidth variant="contained" disabled> Unpublish To Modify</Button>
                                    </CentredFlex>
                                  : <CentredFlex>
                                      <Button name="addAvailability" variant="contained" onClick={() => addAvailability()}>Add Availability</Button>
                                    </CentredFlex>
                                }
                              </div>
                            : <div></div>
                          }
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
      }
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
        ? <Button name="submit" variant="contained" onClick={(e) => sendListingDetails(true, null, details, navigate)}> Submit </Button>
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
        ? <Button name='Save' variant="contained" onClick={(e) => sendListingDetails(false, listingId, details, navigate)}> Save Changes </Button>
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
