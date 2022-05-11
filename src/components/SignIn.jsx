import React, { useState } from 'react';
import '../App.css';

import { Grid, Input } from '@mui/material';


var SignIn = ({ auth, setUser, setUsername }) => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    

    const onChange = (event) => {
        if (event.target.name === "email" ) {
            setEmail(event.target.value);
            
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const signIn = () => {
        console.log("Iniciando sesion...")

        //signInWithEmailAndPassword(auth, email, password);
        if (email?.length > 0) {
            setUsername(email);
        }

    }

  return (
    <>
        <form className='login-form'>              
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid
                    item
                    sm={12}
                    md={6}
                >
                    <label className="login-label">Username : </label>   
                    <Input input="color: rgb(255, 239, 239)" className="login-input" type="text" placeholder="Enter Email" name="email" value={email} onChange={onChange} required /> 
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={6}
                >
                    <label className="login-label">Password : </label>   
                    <Input className="login-input" type="text" placeholder="Password" name="password" value={password} onChange={onChange} required />  
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={12}
                >
                    <button className="sign-in" onClick={signIn}>Sign in with email and password</button> 
                </Grid>
                
            </Grid>   
        </form>     
      
    </>
  )

}

export default SignIn;