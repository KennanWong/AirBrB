/* eslint-disable */
import React from 'react';
import TextInput from './Components/TextInput';
// import { apiFetch } from './Components/Helpers';


const submitLogin = async () => {
    const body = {
        email: email,
        password: password,
    };

    try {
        const ret = await apiFetch('POST', '/user/auth/login', null, body);
        const data = await ret.json();
        console.log(data.value);
    } catch (e) {
        alert(e);
    }
};
    

export default function Login () {
    const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    console.log(email);
    return (
        <div>
            Hello
            <TextInput label = {'Email'} useState = {setEmail}/>
            <br></br>
            Email
            <br></br>
            Password
            {/* <Button variant="contained" onClick={ submitLogin }>Login</Button> */}
        </div>
    );
}
