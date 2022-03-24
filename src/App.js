import React, { useRef, useState } from 'react';
import './App.css';

import { Input } from '@mui/material';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAJ49nwsMx3uvhs5NObpEmbu1hOcVBvjfY",
    authDomain: "pingme-7ca70.firebaseapp.com",
    projectId: "pingme-7ca70",
    storageBucket: "pingme-7ca70.appspot.com",
    messagingSenderId: "602385753477",
    appId: "1:602385753477:web:cdaf5511850e1ec81c10ec"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

    const [user] = useAuthState(auth);
    


    return (
        <div className="App">
        <header>
            <h1>⚛️🔥💬</h1>
            <SignOut />
        </header>

        <section>
            {user ? <ChatRoom /> : <SignIn />}
        </section>

        </div>
    );
}

function SignIn() {

    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    

    const onChange = (event) => {
        setUsername(event.target.name)
    }

    const signIn = () => {
        console.log(username)
        setUsername(username)
        // firebase.auth().signInWithEmailAndPassword(email, pass).then(user => {
        //     console.log(user)
        // })
    }

  return (
    <>
        <form>  
            <label>Username : </label>   
            <Input type="text" placeholder="Enter Username" name="username" value={username} onChange={onChange} required />  
            <button className="sign-in" onClick={signIn}>Sign in with email and password</button>   
        </form>     
      
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;
