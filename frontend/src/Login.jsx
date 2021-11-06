/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router';

// Self defined Components
import TextInput from './Components/TextInput';
import {
  StyledForm,
  WrappedContainer
} from './Components/Styles';
import PasswordInput from './Components/PasswordInput';
import { apiFetch, setToken } from './Helpers';

// https://www.canva.com/colors/color-palettes/summer-splash/

const submitLogin = async (email, password, setErrorMsg, setErrorStatus, setActiveUser) => {
  const body = {
    email: email,
    password: password,
  };
  try {
    const ret = await apiFetch('POST', '/user/auth/login', null, body);
    console.log(ret);
    setToken(ret.token);
    setActiveUser(true);
  } catch (e) {
    console.log(e);
    setErrorStatus({
      email: true,
      password: true,
    })
    setErrorMsg({
      email: e,
      password: e,
    })
  }
};

 

export default function Login ({ setActiveUser }) {
  const [email, setEmail] = React.useState('');
  const [passwordField, setPasswordField] = React.useState({
    password: '',
    showPassword: false,
  });

  const [errorStatus, setErrorStatus] = React.useState({
    email: false,
    password: false,
  });

  const [errorMsg, setErrorMsg] = React.useState({
    email: '',
    password: '',
  })

  const resetError = () => {
    setErrorStatus({
      email: false,
      password: false,
    });
    setErrorMsg({
      email: '',
      password: '',
    })
  }

  console.log(email);
  console.log(passwordField.password);

  return (
    <Container sx= {{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
        <WrappedContainer>
          <StyledForm>
            <h1>
              Welcome back to AirBrb.
            </h1>
            <div>
              <TextInput errorStatus={errorStatus.email} errorMsg={errorMsg.email} resetError={resetError} label='Email' setState={setEmail}/>
              <PasswordInput errorStatus={errorStatus.password} errorMsg={errorMsg.password} resetError={resetError} label='Password' passwordField={passwordField} setState={setPasswordField}/>
            </div>
            <br/>
            <Button variant="contained" onClick={(e) => submitLogin(email, passwordField.password, setErrorMsg, setErrorStatus, setActiveUser) }>Login</Button>
          </StyledForm>
          <Divider variant="middle"/>
          <StyledForm>
            <Link href='/register' underline="hover">
              Don't have an Accout? Register here.
            </Link>
          </StyledForm>
        </WrappedContainer>
      </Box>
    </Container>
  );
}
