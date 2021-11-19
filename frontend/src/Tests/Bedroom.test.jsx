/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/"
import { render } from '@testing-library/react';
import { Card, CardContent, IconButton, MenuItem, Select, TextField } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';

import { Bedroom, BedroomDetail, BedroomInput } from '../Components/Bedroom';
import { Flex } from '../Components/Styles';

const noop = () => {};

const testDetails = {
  bedroomsList: [
    {
      "numBeds": 1,
      "type": "Queen"
    },
    {
      "numBeds": 1,
      "type": "Single"
    }
  ]
}

const emptyDetails = {
  bedroomsList: [
    {
      "numBeds": 0,
      "type": '',
    }
  ]
}

describe('Bedroom', () => {
  it ('Renders Bedroom detail', () => {
    const wrapper = shallow(<Bedroom isInput={false} listingDetails={testDetails} setListingDetails={noop}/>)
    expect(wrapper.find(BedroomDetail).length).toBe(1);
    expect(wrapper.find(BedroomInput).length).toBe(0);
  });

  it ('Renders Bedroom input', () => {
    const wrapper = shallow(<Bedroom isInput={true} listingDetails={testDetails} setListingDetails={noop}/>)
    expect(wrapper.find(BedroomDetail).length).toBe(0);
    expect(wrapper.find(BedroomInput).length).toBe(1);
  });
});

describe('Bedroom detail', () => {
  it ('Renders bedroom detail with correct details', () => {
    const wrapper = shallow(<BedroomDetail bedroomNum={1} bedroomDetails={testDetails.bedroomsList[0]}/>);
    expect(wrapper.find(CardContent).text()).toContain('Bedroom 1.');
    expect(wrapper.find(CardContent).text()).toContain('1 Queen bed.');
  })
})

describe ('Bedroom input', () => {
  it ('Renders bedroom input fields with correct details', () => {
    const wrapper = shallow(<BedroomInput bedroomNum={1} listingDetails={testDetails} setListingDetails={noop}/>);
    expect(wrapper.find(Flex).text()).toBe('Bedroom 1.');
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(TextField).props().value).toBe(1);
    expect(wrapper.find(Select).length).toBe(1);
    expect(wrapper.find(MenuItem).length).toBe(4);
    expect(wrapper.find(Select).props().value).toBe('Queen');
  });

  it ('Allows for bedroom number to be set', () => {
    const setDetails = jest.fn()
    const wrapper = shallow(<BedroomInput bedroomNum={1} listingDetails={emptyDetails} setListingDetails={setDetails}/>);
    const bedroomNum = wrapper.find(TextField);
    bedroomNum.simulate('change', {target: {label: 'Number of Beds', value: 1}});
    expect(setDetails).toHaveBeenCalledTimes(1);
  })

  it ('Allows for bedroom type to be set', () => {
    const setDetails = jest.fn()
    const wrapper = shallow(<BedroomInput bedroomNum={1} listingDetails={emptyDetails} setListingDetails={setDetails}/>);
    const bedType = wrapper.find(Select);
    bedType.simulate('change', {target: {label: 'Bed Type', value: 'Single'}});
    expect(setDetails).toHaveBeenCalledTimes(1);
  })

  it ('Allows for a bedroom to be removed', () => {
    const setDetails = jest.fn()
    const wrapper = shallow(<BedroomInput bedroomNum={1} listingDetails={testDetails} setListingDetails={setDetails}/>);
    
    wrapper.find(IconButton).simulate('click');
    expect(setDetails).toHaveBeenCalledTimes(1);
  })
})
