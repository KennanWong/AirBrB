/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/"
import { render } from '@testing-library/react';
import { TextField } from '@mui/material';

import Address from '../Components/Address'
import { AddressString } from '../Components/Address'

const noop = () => {};

const dummyAddress = {
  streetAddress: 'street',
  apartment: 'apartment',
  city: 'city',
  postcode: 'postcode',
  state: 'state',
  country: 'country',
};

const noApartment = {
  streetAddress: 'street',
  apartment: '',
  city: 'city',
  postcode: 'postcode',
  state: 'state',
  country: 'country',
};

const emptyAddress = {
  streetAddress: '',
  apartment: '',
  city: '',
  postcode: '',
  state: '',
  country: '',
};


describe('Address', () => {
  it ('Renders 6 text fields', () => {
    const wrapper = shallow(<Address details={{address: emptyAddress}} setDetails={noop}/>);
    expect(wrapper.find(TextField).length).toBe(6);
  });

  it ('Renders 6 text fields with presupplied data', () => {
    const wrapper = shallow(<Address details={{address: dummyAddress}} setDetails={noop}/>);
    expect(wrapper.find(TextField).length).toBe(6);
    const textFields = wrapper.find(TextField);
    expect(textFields.at(0).props().value).toBe(dummyAddress.streetAddress);
    expect(textFields.at(1).props().value).toBe(dummyAddress.apartment);
    expect(textFields.at(2).props().value).toBe(dummyAddress.city);
    expect(textFields.at(3).props().value).toBe(dummyAddress.postcode);
    expect(textFields.at(4).props().value).toBe(dummyAddress.state);
    expect(textFields.at(5).props().value).toBe(dummyAddress.country);
  });

  it ('Triggers setDetails function on edit', () => {
    const setDetails = jest.fn();
    const wrapper = shallow(<Address details={{address: emptyAddress}} setDetails={setDetails}/>);
    const textFields = wrapper.find(TextField);
    textFields.at(0).simulate('change', {target: {label: "Street Address", value: 'a'}});
    textFields.at(1).simulate('change', {target: {label: "Apartment", value: 'b'}});
    textFields.at(2).simulate('change', {target: {label: "City", value: 'c'}});
    textFields.at(3).simulate('change', {target: {label: "Post Code", value: 'd'}});
    textFields.at(4).simulate('change', {target: {label: "State", value: 'e'}});
    textFields.at(5).simulate('change', {target: {label: "Country", value: 'f'}});
    expect(setDetails).toHaveBeenCalledTimes(6);
  })
});

describe('AddressString', () => {
  it('Displays an Address String', () => {
    const wrapper = shallow(<AddressString address={ dummyAddress }/>);
    expect(wrapper.find('h2').text()).toBe(`${dummyAddress.apartment}, ${dummyAddress.streetAddress}, ${dummyAddress.city}, ${dummyAddress.postcode}, ${dummyAddress.state}, ${dummyAddress.country}`)
  })
  
  it('Displays an Address String without an apartment', () => {
    const wrapper = shallow(<AddressString address={ noApartment }/>);
    expect(wrapper.find('h2').text()).toBe(`${dummyAddress.streetAddress}, ${dummyAddress.city}, ${dummyAddress.postcode}, ${dummyAddress.state}, ${dummyAddress.country}`)
  })
  
})