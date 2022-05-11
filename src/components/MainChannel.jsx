import React, { useRef, useState } from 'react';
import '../App.css';

import ChatMessage from './ChatMessage';


let MainChannel = ({ auth, username, socket }) => {
    
    const [group, setGroup] = useState()
    const [messages, setMessages] = useState([
        // TODO: Asignar valores 
    ]);

    const dummy = useRef();
    const [formValue, setFormValue] = useState('');


    let fetchAlerts = () => {
        socket.emit('fetch');
    }

    let sendMessageToGroup = (group, msg) => {
        socket.emit('group', {
            "group": group,
            "msg": msg,
            "timestamp": new Date().toISOString
        })
    }

    let getConnectedUsers = () => {
        socket.emit('users')
    }
  
  
    const sendMessage = async (e) => {
        e.preventDefault();
        
        let msg_data = {
            "group": group,
            "from": username,
            "msg": e.target.value,
            "timestapm": new Date().toISOString
        }

        messages.push(msg_data)

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
        <main>
  
            {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
    
            <span ref={dummy}></span>
    
        </main>
    
        <form onSubmit={sendMessage}>
    
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
            <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
    </>)
  }

export default MainChannel