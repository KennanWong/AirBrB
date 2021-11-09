import React from 'react';

// import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
// import Typography from '@mui/material/Typography';

// MUI icon
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import { CentredFlex } from './Styles';

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
  const setNumBeds = (value) => {
    const bedroomsList = listingDetails.bedroomsList;
    bedroomsList[bedroomNum - 1].numBeds = value;
    // Check if we have exceeded the number of beds and if so adjust the number of beds
    let sumBeds = 0;
    for (const room in bedroomsList) {
      sumBeds += Number(bedroomsList[room].numBeds);
    }

    if (sumBeds > listingDetails.beds) {
      setListingDetails({ ...listingDetails, bedroomsList: bedroomsList, beds: sumBeds })
    } else {
      setListingDetails({ ...listingDetails, bedroomsList: bedroomsList })
    }
  }

  return (
    <Card sx={{ width: 200, height: 150 }}>
      <React.Fragment>
        <CardContent>
          <CentredFlex>
            <BedroomParentOutlinedIcon/> Bedroom {bedroomNum}.
          </CentredFlex>
          <TextField value={listingDetails.bedroomsList[bedroomNum - 1].numBeds} label="Number of beds" type="number" variant="standard" onChange={(e) => setNumBeds(e.target.value)} />
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
          <CentredFlex>
            <BedroomParentOutlinedIcon/> Bedroom {bedroomNum}.
          </CentredFlex>
          <br/>
          {bedroomDetails.numBeds} beds.
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
    <Card sx={{ width: 200, height: 150 }}>
      <CardActionArea sx={{ width: 200, height: 150 }} onClick={() => addBedroomFunc()}>
        <CardContent>
          <Typography gutterBottom variant="body1" sx={{ textAlign: 'center' }}>
            Add a new Bedroom
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
