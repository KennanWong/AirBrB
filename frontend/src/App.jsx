/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import Login from './Pages/Login';
import Register from './Pages/Register';
import { Container } from '@mui/material';
import { logout } from './Pages/Logout';
import CreateListing from './Pages/CreateListing';
import MyListings from './Pages/MyListings';
import { getToken } from './Helpers';
import Listings from './Pages/Listings';
import ShowListing from './Pages/ShowListing';
import ManageBookings from './Pages/ManageBookings';

const isUserActive = () => {
  console.log('token: ', getToken())
  if (getToken() != null) {
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

  const logoutFn = (navigate) => {
    handleClose();
    logout(setActiveUser);
    navigate('/');
  }

  const navigate = useNavigate();
  return (
    <HeaderStyle>
      <Button sx={{ textTransform: 'none', color: '#000000' }} onClick={() => navigate('/')}>
        <h1 style={{ margin: '0px' }}>
          AirBrb.
        </h1>
      </Button>
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
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/myListings');
                  }}
                >
                  My Listings
                </MenuItem>
                <MenuItem onClick={(e) => logoutFn(navigate)}>Logout</MenuItem>
              </div>
            : <div>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/login');
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/register')
                  }}
                >
                  Register
                </MenuItem>
              </div>
          }
          <MenuItem
            onClick={() => {
              handleClose();
              navigate('/');
            }}
          >
            Home
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
          <Route exact path="/" element={<Navigate replace to="/listings"/>}>
          </Route>
          <Route path="/listings" element={<Listings/>}/>
          <Route path="/myListings" element={<MyListings/>}/>
          <Route path="/createListing" element={<CreateListing newListing={true}/>}/>
          <Route path="/listing/:id" element={<ShowListing/>}/>
          <Route path="/editListing/:id" element={<CreateListing newListing={false}/>}/>
          <Route path="/manageBookings/:id" element={<ManageBookings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
