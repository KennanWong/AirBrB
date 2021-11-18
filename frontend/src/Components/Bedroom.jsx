
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
import BedIcon from '@mui/icons-material/Bed';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Flex, SpacedFlex } from './Styles';

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
  const bed = listingDetails.bedroomsList[bedroomNum - 1];

  const handleChange = (prop, value) => {
    const bedroomsList = listingDetails.bedroomsList;
    let sumBeds = 0;
    for (const room in bedroomsList) {
      sumBeds += Number(bedroomsList[room].numBeds);
    }
    if (prop === 'numBeds' && value < 0) {
      value = 0;
    }

    if (prop === 'numBeds' && bed.type === '') {
      bedroomsList[bedroomNum - 1].numBeds = value;
      bedroomsList[bedroomNum - 1].type = 'Single';
    } else if (prop === 'type' && bed.numBeds === '') {
      bedroomsList[bedroomNum - 1].numBeds = 1;
      bedroomsList[bedroomNum - 1].type = value;
    } else {
      bedroomsList[bedroomNum - 1][prop] = value;
    }
    setListingDetails({ ...listingDetails, bedroomsList: bedroomsList, beds: sumBeds });
  }

  return (
    <Card sx={{ width: 250, height: 200 }}>
      <React.Fragment>
        <CardContent>
          <SpacedFlex>
            <Flex> Bedroom {bedroomNum}. </Flex>
            <IconButton
              onClick={(e) => {
                const bedroomsListCpy = listingDetails.bedroomsList;
                bedroomsListCpy.splice(bedroomNum - 1, 1);
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
    <Card sx={{ width: 200, height: 150 }}>
      <React.Fragment>
        <CardContent>
          <BedroomIcons bedroomDetails={bedroomDetails}/>
          Bedroom {bedroomNum}.
          <br/>
          { (bedroomDetails.numBeds === '1')
            ? <div> {bedroomDetails.numBeds} {bedroomDetails.type} bed. </div>
            : <div> {bedroomDetails.numBeds} {bedroomDetails.type} beds. </div>
          }
        </CardContent>
      </React.Fragment>
    </Card>
  )
}

BedroomIcons.propTypes = {
  bedroomDetails: PropTypes.object,
}

function BedroomIcons ({ bedroomDetails }) {
  let sum = Number(bedroomDetails.numBeds);
  let overFlow = false;
  let extra = 0;
  if (sum > 4) {
    overFlow = true;
    extra = sum - 4;
    sum = 4;
  }
  const numBeds = [...Array(Number(sum)).keys()];
  return (
    <Flex>
      {numBeds.map((value, key) => {
        return <div key={key}>
          { (bedroomDetails.type === 'Single')
            ? <SingleBedIcon/>
            : <BedIcon/>
          }
        </div>
      })}
      {overFlow
        ? <div>+ {extra}</div>
        : <div></div>
      }
    </Flex>
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
    bedroomsList.push({ numBeds: '', type: '' });
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
