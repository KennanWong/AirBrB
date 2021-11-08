import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MUI
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';

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
        <BedroomParentOutlinedIcon/> : {bedroomNum}
      </Item>
      <Item>
        <BathroomOutlinedIcon/> : {bathroomNum}
      </Item>
    </Bar>
  )
}
