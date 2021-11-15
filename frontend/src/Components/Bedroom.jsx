/* eslint-disable */

import React from 'react';

// import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// import Typography from '@mui/material/Typography';

// MUI icon
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { CentredFlex, SpacedFlex } from './Styles';

Bedroom.propTypes = {
  isInput: PropTypes.bool,
  bedroomNum: PropTypes.number,
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

export function Bedroom ({ isInput, bedroomNum, listingDetails, setListingDetails }) {
  const bedroomDetails = listingDetails.bedroomsList[bedroomNum - 1];
  return (
    <div>
      {isInput
        ? <BedroomInput bedroomNum={bedroomNum} bedroomDetails={bedroomDetails} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
        : <BedroomDetail bedroomNum={bedroomNum} bedroomDetails={bedroomDetails}/>
      }
    </div>
  )
}

BedroomInput.propTypes = {
  bedroomNum: PropTypes.number,
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

function BedroomInput ({ bedroomNum, listingDetails, setListingDetails }) {
  const [bed, setBed] = React.useState({
    numBeds: '',
    type: '',
  })
  /*
  const setNumBeds = (value) => {
    const bedroomsList = listingDetails.bedroomsList;
    bedroomsList[bedroomNum - 1].numBeds = value;
    // Check if we have exceeded the number of beds and if so adjust the number of beds
    let sumBeds = 0;
    for (const room in bedroomsList) {
      sumBeds += Number(bedroomsList[room].numBeds);
    }
    setListingDetails({ ...listingDetails, bedroomsList: bedroomsList, beds: sumBeds })
  }
  */
  const handleChange = (prop, value) => {
    if (prop === 'numBeds' && bed.type === '') {
      setBed({ ...bed, ['numBeds']: value, ['type']: 'Single' });
    }
    else if (prop === 'type' && bed.numBeds === '') {
      setBed({ ...bed, ['numBeds']: 1, ['type']: value });
    } else {
      setBed({ ...bed, [prop]: value });
    }
    
  }

  return (
    <Card sx={{ width: 250, height: 200 }}>
      <React.Fragment>
        <CardContent>
          <SpacedFlex>
            <CentredFlex> Bedroom {bedroomNum}. </CentredFlex>
            <IconButton
              onClick={(e) => {
                const bedroomsListCpy = listingDetails.bedroomsList;
                bedroomsListCpy.splice(bedroomNum - 1, bedroomNum);
                setListingDetails({ ...listingDetails, bedroomsList: bedroomsListCpy })
                console.log('Remove this bedroom')
              }}
            >
              <DeleteOutlinedIcon/>
            </IconButton>
          </SpacedFlex>
          <SpacedFlex>
            <TextField value={bed.numBeds} label="Number of beds" type="number" variant="standard" onChange={(e) => handleChange('numBeds', e.target.value)} />
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel> Bed Type </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bed.type}
                label="Age"
                autoWidth
                onChange={(e) => {
                  handleChange('type', e.target.value)
                }}
              >
                <MenuItem value={'Single'}>Single</MenuItem>
                <MenuItem value={'Double'}>Double</MenuItem>
                <MenuItem value={'Queen'}>Queen</MenuItem>
                <MenuItem value={'King'}>King</MenuItem>
              </Select>
            </FormControl>
          </SpacedFlex>
        </CardContent>
      </React.Fragment>
    </Card>
  )
}

BedroomDetail.propTypes = {
  bedroomNum: PropTypes.number,
  bedroomDetails: PropTypes.object,
}

function BedroomDetail ({ bedroomNum, bedroomDetails }) {
  return (
    <Card sx={{ width: 250, height: 200 }}>
      <React.Fragment>
        <CardContent>
          <CentredFlex>
            <BedroomParentOutlinedIcon/> Bedroom {bedroomNum}.
          </CentredFlex>
          <br/>
          { (bedroomDetails.numBeds === '1')
            ? <div> {bedroomDetails.numBeds} bed. </div>
            : <div> {bedroomDetails.numBeds} beds. </div>
          }
        </CardContent>
      </React.Fragment>
    </Card>
  )
}

AddBedroom.propTypes = {
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

export function AddBedroom ({ listingDetails, setListingDetails }) {
  const addBedroomFunc = () => {
    console.log('adding a bedroom');
    const bedroomsList = listingDetails.bedroomsList;
    bedroomsList.push({ numBeds: '' });
    setListingDetails({ ...listingDetails, bedroomsList: bedroomsList });
  }
  return (
    <Card sx={{ width: 250, height: 200 }}>
      <CardActionArea sx={{ width: 250, height: 200 }} onClick={() => addBedroomFunc()}>
        <CardContent>
          <Typography gutterBottom variant="body1" sx={{ textAlign: 'center' }}>
            Add a new Bedroom
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
