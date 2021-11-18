/* eslint-disable*/
import React from 'react';
import Calendar from './Calendar';

export default function Availability ({ index, listingDetails, setListingDetails, published }) {
  const [availability, setAvailability] = React.useState({
    dates: [null, null]
  })
  console.log(index);

  
  React.useEffect(() => {
    const fromMem = listingDetails.availability[index];
    console.log(fromMem)
    setAvailability({ ...availability, dates: fromMem })
  }, [listingDetails])
  
  
  const handleChange = (prop, value) => {
    const availabilityList = listingDetails.availability;
    availabilityList[index] = value;
    setListingDetails({ ...listingDetails, availability: availabilityList });
    setAvailability({...availability, [prop]: value});
    // Set availability field in listing details
  }

  
  return (
    <Calendar isInput={true} booking={availability} listingDetails={null} handleChange={handleChange} readOnly={published}/>
  )
}
