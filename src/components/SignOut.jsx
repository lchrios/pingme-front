import React from 'react';
import '../App.css';

function SignOut({ auth }) {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default SignOut  