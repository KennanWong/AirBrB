/* eslint-disable */
import React from 'react';

import PropTypes from 'prop-types';
import {
  Bedroom,
  AddBedroom,
}  from './Bedroom.jsx';
import  styled  from 'styled-components';

Bedrooms.propTypes = {
  isInput: PropTypes.bool,
  bedroomNum: PropTypes.number,
  listingDetails: PropTypes.object,
  setListingDetails: PropTypes.func,
}

const BedroomCardsList = styled.div`
  display: flex;
  gap: 10px;
  overflow: auto;
  &::-webkit-scrollbar-track {
    -webkit-appearance: none;
    box-shadow: nset 0 0 6px grey;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: darkBlue;
    border-radius: 15px;
    height: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: lightBlue;
    max-height: 10px;
  }
`;

export function Bedrooms ({ isInput, bedroomNum, listingDetails, setListingDetails }) {
  const numList = [];
  for (let i = 0; i < bedroomNum; i++) {
    numList.push(i + 1);
  }

  return (
    <BedroomCardsList>
        {numList.map((value, key) => {
          return (
            <Bedroom key={key} isInput={isInput} bedroomNum={value} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
          )
        })}
        { isInput
          ? <AddBedroom listingDetails={listingDetails} setListingDetails={setListingDetails}/>
          : <span></span>
        }
    </BedroomCardsList>
  )
}
