import React, { useEffect, useState } from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/analytics';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

import ChatSelector from './components/ChatSelector';
import ChannelRender from './components/ChannelRender';

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyAJ49nwsMx3uvhs5NObpEmbu1hOcVBvjfY",
    authDomain: "pingme-7ca70.firebaseapp.com",
    projectId: "pingme-7ca70",
    storageBucket: "pingme-7ca70.appspot.com",
    messagingSenderId: "602385753477",
    appId: "1:602385753477:web:cdaf5511850e1ec81c10ec"
});
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
const auth = getAuth(app);

function App() {

    const [username, setUsername] = useState();
    const [group, setGroup] = useState(1);
    

    let logout = () => {
        setTimeout(() => setUsername(undefined), 1000 * Math.random() + 300)
    }

    useEffect(() => {console.log("Group: " + group)}, [group])
    return (
        <div className="App">
            <header className='top-bar'>
                <ChatSelector setGroup={setGroup} group={group} username={username} />
                <SignOut username={username} logout={logout} />
            </header>

            <section className="canvas">
                {
                    username !== undefined 
                    ?   <ChannelRender auth={auth} firestore={firestore} username={username}  group={group} /> 
                    :   <SignIn auth={auth} setUsername={setUsername} />
                }
            </section>
        </div>
    );
}

export default App;
