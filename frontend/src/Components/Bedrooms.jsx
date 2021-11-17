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
`;

const BedroomInputCards = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;


export function Bedrooms ({ isInput, bedroomNum, listingDetails, setListingDetails }) {
  const numList = [];
  for (let i = 0; i < bedroomNum; i++) {
    numList.push(i + 1);
  }

  return (
    <div>
      {(isInput)
        ? <BedroomInputCards>
            {numList.map((value, key) => {
              return (
                <Bedroom key={key} isInput={isInput} bedroomNum={value} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
              )
            })}
            <AddBedroom listingDetails={listingDetails} setListingDetails={setListingDetails}/>
          </BedroomInputCards>
        : <BedroomCardsList>
            {numList.map((value, key) => {
              return (
                <Bedroom key={key} isInput={isInput} bedroomNum={value} listingDetails={listingDetails} setListingDetails={setListingDetails}/>
              )
            })}
          </BedroomCardsList>
      }
    </div>
    
  )
}
