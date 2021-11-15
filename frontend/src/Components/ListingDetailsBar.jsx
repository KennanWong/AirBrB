import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MUI
const Bar = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  padding: 5px;
  gap: 5px;
  border-radius: 5px;
  align-items: center;
  font-size: 10pt;
`;

ListingDetailsBar.propTypes = {
  bedroomNum: PropTypes.number,
  bathroomNum: PropTypes.number,
}

export default function ListingDetailsBar ({ bedroomNum, bathroomNum }) {
  return (
    <Bar>
      <Item>
        <h4>{bedroomNum}</h4>
        {(bedroomNum === 1)
          ? <p>Bedroom</p>
          : <p>Bedrooms</p>
        }
      </Item>
      <Item>
        <h4>{bathroomNum}</h4>
        {(bathroomNum === 1)
          ? <p>Bathroom</p>
          : <p>Bathrooms</p>
        }
      </Item>
    </Bar>
  )
}
