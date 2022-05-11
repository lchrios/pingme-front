import React, { useEffect, useState } from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/analytics';

import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';
import SignOut from './components/SignOut';

import { io } from "socket.io-client";

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

    const port = 9999;
    const socket = io('http://localhost:'+port.toString())

    socket.on('connect', () => {

    })

    socket.on('from', () => {})
    socket.on('fetch', () => {})
    socket.on('group', () => {})
    socket.on('users', () => {})    

    const [user, setUser] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        console.log(user)
    }, [user])

    auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user)
        }
    })

    return (
        <div className="App">
        <header>
            <h1>⚛️🔥💬</h1>
            <SignOut auth={auth}/>
        </header>

        <section>
            {
                username !== undefined 
                ? <ChatRoom auth={auth} firestore={firestore} username={username} socket={socket} /> 
                : <SignIn auth={auth} setUsername={setUsername} setUser={setUser} />
            }
        </section>

        </div>
    );
}

export default App;
