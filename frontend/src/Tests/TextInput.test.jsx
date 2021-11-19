import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from '../Components/TextInput';

test('renders learn react link', () => {
  render(<TextInput />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
