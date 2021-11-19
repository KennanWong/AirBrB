/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/"
import TextInput from '../Components/TextInput';
import { render } from '@testing-library/react';
import { TextField } from '@mui/material';

describe('TextInput', () => {
  const noop = () => {};
  const label = 'label';
  const errorMsg = 'error';

  it('changes the label', () => {
    const wrapper = shallow(<TextInput errorStatus={false} errorMsg={errorMsg} resetError={noop} label={label} setState={noop}/>);
    const test = wrapper.find(TextField).at(0);
    expect(test.props().label).toBe(label);
  });

  it('triggers onChange when input changes', () => {
    const onChange= jest.fn();
    const wrapper = shallow(<TextInput errorStatus={false} errorMsg={errorMsg} resetError={noop} label={label} setState={onChange}/>);
    const test = wrapper.find(TextField).at(0);
    test.simulate('change', {target: {name: {label}, value: 'a'}});
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not trigger resetError on non error status', () => {
    const resetError= jest.fn();
    const wrapper = shallow(<TextInput errorStatus={false} errorMsg={errorMsg} resetError={resetError} label={label} setState={noop}/>);
    const test = wrapper.find(TextField).at(0);
    test.simulate('change', {target: {name: {label}, value: 'a'}});
    expect(resetError).toHaveBeenCalledTimes(0);
  })

  it('triggers resetError on error change', () => {
    const resetError= jest.fn();
    const wrapper = shallow(<TextInput errorStatus={true} errorMsg={errorMsg} resetError={resetError} label={label} setState={noop}/>);
    const test = wrapper.find(TextField).at(0);
    test.simulate('change', {target: {name: {label}, value: 'a'}});
    expect(resetError).toHaveBeenCalledTimes(1);
  })
})
