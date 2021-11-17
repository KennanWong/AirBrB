import React from 'react';
import { Route } from 'react-router';
import { getReviewRating } from './Components/Rating';

// Function to make api calls
export const apiFetch = (method, route, TOKEN, body) => {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: null,
  };

  if (method !== 'GET' && body !== null) {
    requestOptions.body = JSON.stringify(body);
  }

  if (TOKEN !== null) {
    requestOptions.headers.Authorization = `Bearer ${TOKEN}`;
  } else {
    console.log('empty token');
  }

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5005${route}`, requestOptions)
      .then((response) => {
        switch (response.status) {
          case 200:
            response.json().then((data) => {
              resolve(data);
            });
            break;
          case 400:
            console.log('responseError', response);
            response.json().then((data) => {
              console.log(data.error);
              reject(data.error);
            });
            break;
          case 403:
            response.json().then((data) => {
              reject(data.error);
            });
            break;
        }
      })
      .catch((response) => {
        console.log(response);
        response.json().then((data) => {
          resolve(data.error);
        });
      });
  });
};

// Function to set a specific field within a state
export const setFieldInState = (field, value, state, setState) => {
  const stateCopy = state;
  stateCopy[field] = value;
  setState({
    ...state,
    stateCopy,
  });
}

export const setToken = (token) => {
  if (token == null) {
    localStorage.removeItem('active-email');
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', token);
  }
}

export const getToken = () => {
  return localStorage.getItem('token');
}

export const setEmail = (email) => {
  localStorage.setItem('active-email', email)
}

export const getEmail = (email) => {
  return localStorage.getItem('active-email');
}

export function navigateTo (path, element) {
  return (
    <Route path={path} element={element}/>
  )
}

export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const getListingDetails = async (id, listingDetails, setListingDetails) => {
  try {
    const ret = await apiFetch('GET', `/listings/${id}`, null, {});
    const listing = ret.listing;
    console.log('listing deets', listing);

    if (listingDetails != null) {
      setListingDetails({
        ...listingDetails,
        title: listing.title,
        address: listing.address,
        price: Number(listing.price),
        thumbnail: listing.thumbnail,
        type: listing.metadata.type,
        bathrooms: Number(listing.metadata.bathrooms),
        beds: Number(listing.metadata.beds),
        bedroomsList: listing.metadata.bedroomsList,
        reviews: listing.reviews,
        ammenities: listing.metadata.ammenities,
        published: listing.published,
        availability: listing.availability,
      })
    }
    return listing;
  } catch (e) {
    alert(e);
  }
}

export const sendListingDetails = async (newListing, listingId, details, navigate) => {
  let sumBeds = 0;
  for (const room in details.bedroomsList) {
    sumBeds += Number(details.bedroomsList[room]);
  }

  if (sumBeds < details.beds) {
    details.beds = sumBeds
  }

  const body = {
    title: details.title,
    address: details.address,
    price: details.price,
    thumbnail: details.thumbnail,
    metadata: {
      reviews: [],
      bathrooms: details.bathrooms,
      type: details.type,
      beds: details.beds,
      bedroomsList: details.bedroomsList,
      ammenities: details.ammenities,
      public: details.public,
    }
  }
  try {
    let ret;
    if (newListing) {
      ret = await apiFetch('POST', '/listings/new', getToken(), body);
    } else {
      ret = await apiFetch('PUT', `/listings/${listingId}`, getToken(), body);
    }
    console.log(ret);
    if (navigate !== null) {
      navigate('/myListings');
    }
  } catch (e) {
    alert(e)
  }
}

export const getListings = async (myListings, listingsList, setListingsList, params) => {
  console.log('Getting listings')
  const ret = await apiFetch('GET', '/listings', null, {});
  const curListings = ret.listings
  listingsList = [];
  for (const item in curListings) {
    const listing = curListings[item];
    if (myListings) {
      console.log(listing);
      if (listing.owner === getEmail()) {
        listingsList.push(listing);
      }
    } else {
      const details = await getListingDetails(listing.id, null, null);
      if (details.published) {
        if (params === null) {
          console.log('pushing to list')
          listingsList.push(listing);
        } else {
          if (filter(details, params)) {
            listingsList.push(listing);
          }
        }
      }
    }
  }
  listingsList.sort(dynamicSort('title'));
  setListingsList([...listingsList]);
}

export const filter = (details, params) => {
  console.log('filtering: ', details.title);
  const search = params.search.toLowerCase();
  let pass = false;
  if (search !== '') {
    if (details.title.toLowerCase().includes(search)) {
      pass = true;
    }
    if (details.metadata.type.toLowerCase().includes(search)) {
      pass = true;
    }
    console.log('ammenities', details.metadata.ammenities);
    const ammenities = details.metadata.ammenities;
    for (const item in ammenities) {
      console.log(ammenities[item]);
      if (ammenities[item].toLowerCase().includes(search)) {
        pass = true;
      }
    }
    if (details.address.city.toLowerCase().includes(search)) {
      pass = true;
    }
    if (!pass) {
      return false;
    }
  }

  const price = params.price;
  if (price !== null) {
    if (!(details.price >= price[0] && details.price <= price[1])) {
      console.log('does not match price criteria')
      return false
    }
  }

  const bedrooms = params.bedrooms;
  const numBedrooms = details.metadata.bedroomsList.length;
  if (bedrooms !== null) {
    if (!(numBedrooms >= bedrooms[0] && numBedrooms <= bedrooms[1])) {
      console.log('does not match bedrooms criteria')
      return false;
    }
  }

  const rating = params.rating;
  console.log('rating', rating);
  if (rating !== null) {
    if (!(getReviewRating(details.reviews) >= rating)) {
      console.log('does not match review criteria')
      return false;
    }
  }

  console.log(details.title, ' a match');
  return true;
}

export const datediff = (first, second) => {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
      * and you may want to customize it to your needs
      */
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}
