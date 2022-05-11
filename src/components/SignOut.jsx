import React from 'react';
import '../App.css';

function SignOut({ username, logout }) {
    return username !== undefined ? (
      <button className="sign-out" onClick={logout}>Sign Out</button>
    ) : <></>
}

export default SignOut  