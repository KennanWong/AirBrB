/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  BrowserRouter,
  Link,
  Navigate,
} from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import { Container } from '@mui/material';
import { logout } from './Logout';
import CreateListing from './Pages/CreateListing';
import MyListings from './Pages/MyListings';
import { getToken } from './Helpers';

const isUserActive = () => {
  if (getToken != null) {
    return true;
  } else {
    return false;
  }
}

export default function App () {
  const [activeUser, setActiveUser] = React.useState(isUserActive());
  return (
    <Container>
      <Body activeUser={activeUser} setActiveUser={setActiveUser}/>
    </Container>
  );
}

const HeaderStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function Header ({ activeUser, setActiveUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFn = () => {
    handleClose();
    logout(setActiveUser);
  }
  return (
    <HeaderStyle>
      <div>
        <h1>
          AirBrb.
        </h1>
      </div>
      <div>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Profile
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {activeUser
            ? <div>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/mylistings'>My Listings</Link>
                </MenuItem>
                <MenuItem onClick={logoutFn}>Logout</MenuItem>
              </div>
            : <div>
                <MenuItem onClick={handleClose}>
                  <Link to='/login'>Login</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/register'>Register</Link>
                </MenuItem>
              </div>
          }
          <MenuItem onClick={handleClose}>
            <Link to='/'>Home</Link>
          </MenuItem>
        </Menu>
      </div>
    </HeaderStyle>
  );
}

function Body ({ activeUser, setActiveUser }) {
  return (
    <div>
      <BrowserRouter>
        <Header activeUser={activeUser} setActiveUser={setActiveUser}/>
        <Routes>
          <Route path="/login" element={<Login setActiveUser={setActiveUser}/>}/>
          <Route path="/register" element={<Register setActiveUser={setActiveUser}/>}/>
          <Route exact path="/" element={<Landing/>}>
            <Navigate to="/listings"/>
          </Route>
          <Route path="/listings" element={<Landing/>}/>
          <Route path="/myListings" element={<MyListings/>}/>
          <Route path="/createListing" element={<CreateListing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
