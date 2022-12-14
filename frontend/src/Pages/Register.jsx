import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import PropTypes from 'prop-types';

// Self defined Components
import TextInput from '../Components/TextInput';
import {
  StyledForm,
  WrappedContainer
} from '../Components/Styles';
import PasswordInput from '../Components/PasswordInput';
import { apiFetch, setFieldInState, setToken, setEmail } from '../Helpers';

Register.propTypes = {
  setActiveUser: PropTypes.func,
}

export default function Register ({ setActiveUser }) {
  const [name, setName] = React.useState('');
  const [email, setRegEmail] = React.useState('');

  const [passwordField, setPasswordField] = React.useState({
    password: '',
    showPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = React.useState({
    password: '',
    showPassword: false,
  });

  const [errorStatus, setErrorStatus] = React.useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errorMsg, setErrorMsg] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const resetError = () => {
    setErrorStatus({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setErrorMsg({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  const navigate = useNavigate();

  const submitRegister = async (name, email, password, confirmPassword, setActiveUser, navigate) => {
    // If passwords do not match
    if (password !== confirmPassword) {
      console.log('passwords not the same');
      setFieldInState('password', true, errorStatus, setErrorStatus);
      setFieldInState('confirmPassword', true, errorStatus, setErrorStatus);
      setFieldInState('password', 'Passwords do not match', errorMsg, setErrorMsg);
      setFieldInState('confirmPassword', 'Passwords do not match', errorMsg, setErrorMsg);
      setPasswordField({
        password: '',
        showPassword: false,
      });
      setConfirmPassword({
        password: '',
        showPassword: false,
      });
      console.log(errorStatus);
      console.log(errorMsg);
      return;
    }
    // If fields are empty
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setFieldInState('name', true, errorStatus, setErrorStatus);
      setFieldInState('email', true, errorStatus, setErrorStatus);
      setFieldInState('password', true, errorStatus, setErrorStatus);
      setFieldInState('confirmPassword', true, errorStatus, setErrorStatus);
      setFieldInState('name', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('email', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('password', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('confirmPassword', 'Fill in required fields.', errorMsg, setErrorMsg);
      return;
    }
    const body = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const ret = await apiFetch('POST', '/user/auth/register', null, body);
      console.log(ret.token);
      setToken(ret.token);
      setEmail(email);
      setActiveUser(true);
      navigate('/');
    } catch (e) {
      setErrorStatus({
        email: true,
      })
      setErrorMsg({
        email: e,
      })
      console.log(errorMsg);
    }
  }

  return (
    <Container sx= {{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
        <WrappedContainer>
          <StyledForm>
            <h1>
              Welcome to AirBrb.
            </h1>
            <div>
              <TextInput
                name='name'
                errorStatus={errorStatus.name}
                errorMsg={errorMsg.name}
                resetError={resetError}
                label='Name'
                setState={setName}
              />
              <TextInput
                name='email'
                errorStatus={errorStatus.email}
                errorMsg={errorMsg.email}
                resetError={resetError}
                label='Email'
                setState={setRegEmail}/>
              <PasswordInput
                name='password'
                errorStatus={errorStatus.password}
                errorMsg={errorMsg.password}
                resetError={resetError}
                label='Password'
                passwordField={passwordField}
                setState={setPasswordField}
              />
              <PasswordInput
                name='confirmPassword'
                errorStatus={errorStatus.confirmPassword}
                errorMsg={errorMsg.confirmPassword}
                resetError={resetError}
                label='Confirm'
                passwordField={confirmPassword}
                setState={setConfirmPassword}/>
            </div>
            <br/>
            <Button label='Submit' variant="contained" onClick={(e) => submitRegister(name, email, passwordField.password, confirmPassword.password, setActiveUser, navigate) }>Register</Button>
          </StyledForm>
          <Divider variant="middle"/>
          <StyledForm>
            <Link to='/login'>
              Already have an Accout? Login here.
            </Link>
          </StyledForm>
        </WrappedContainer>
      </Box>
    </Container>
  );
}
