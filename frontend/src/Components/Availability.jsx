/* eslint-disable*/
import React from 'react';
import Calendar from './Calendar';

export default function Availability ({ index, listingDetails, setListingDetails }) {
  const [availability, setAvailability] = React.useState({
    dates: [null, null]
  })

  const handleChange = (prop, value) => {
    setAvailability({...availability, [prop]: value});
    // Set availability field in listing details

    const availabilityList = listingDetails.availability;
    availabilityList[0] = availability;
    setListingDetails({ ...listingDetails, availability: availabilityList });
  }
  return (
    <Calendar isInput={true} booking={availability} listingDetails={null} handleChange={handleChange}> </Calendar>
  )
}
