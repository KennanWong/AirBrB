import React from 'react';
import { Route } from 'react-router';

// Function to make api calls
export const apiFetch = (method, route, TOKEN, body) => {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: null,
  };

  if (method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  if (TOKEN !== null) {
    requestOptions.headers.Authorization = `Bearer ${TOKEN}`;
  } else {
    console.log('empty token');
  }

  console.log('fetching: ', route);

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
            response.json().then((data) => {
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
    console.log(listing);

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
    })
    console.log(listingDetails);
  } catch (e) {
    alert(e);
  }
}
