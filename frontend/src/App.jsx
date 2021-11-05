import React from 'react';
import './App.css';
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import { getToken } from './Helpers';
import { Container } from '@mui/material';
import { logout } from './Logout';

const token = getToken();

export default function App () {
  return (
    <Container>
      <Header/>
      <Body/>
    </Container>
  );
}

const HeaderStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function Header () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let activeSession = false;
  if (token != null) {
    activeSession = true;
  }

  const logoutFn = () => {
    handleClose();
    logout();
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
          {activeSession
            ? <div>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Listings</MenuItem>
                <MenuItem onClick={logoutFn}>Logout</MenuItem>
              </div>
            : <div>
                <MenuItem onClick={handleClose}>
                  <Link href='/login' underline="none">Login</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href='/register' underline="none">Register</Link>
                </MenuItem>
              </div>
          }
          <MenuItem onClick={handleClose}>
            <Link href='/' underline="none">Home</Link>
          </MenuItem>
        </Menu>
      </div>
    </HeaderStyle>
  );
}

function Body () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route exact path="/" element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
