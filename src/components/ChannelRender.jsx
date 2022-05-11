import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import AlertMessage from './AlertMessage';
import GroupMessage from './GroupMessage';

import { connect, io } from "socket.io-client";


let ChannelRender = ({ group, auth, firestore, username }) => {

    const alerts_data = [
        {
            'alertId': 1,
            'reporter': username,
            'alert': 'Zombies cayendo a la base',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() - 9*60*1000).toLocaleDateString('es-MX',options),
        },
        {
            'alertId': 2,
            'reporter': username,
            'alert': 'Supervivientes encontrads',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() - 6*60*1000).toLocaleDateString('es-MX',options),
        },
        {
            'alertId': 3,
            'reporter': username,
            'alert': 'Alianza con otra comunidad',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() - 3*60*1000).toLocaleDateString('es-MX', options),
        },
    ];

    const messages_data = [
        {
            'group': 3,
            'from': 'Surv1',
            'msg': 'Zombies cayendo a la base',
            'timestamp': new Date().toLocaleDateString('es-MX',options),
        },
        {
            'group': 3,
            'from': username,
            'msg': '¿Por donde vienen?',
            'timestamp': new Date(new Date().getTime() + 3*60*1000).toLocaleDateString('es-MX', options),
        },
        {
            'group': 3,
            'from': 'Surv2',
            'msg': 'Puerta Norte',
            'timestamp': new Date(new Date().getTime() + 6*60*1000).toLocaleDateString('es-MX', options),
        },
        {
            'group': 2,
            'from': 'Surv2',
            'msg': '¿Alguien sabe de algun lugar para obtener refacciones?',
            'timestamp': new Date().toLocaleDateString('es-MX',options),
        },
        {
            'group': 2,
            'from': username,
            'msg': 'En la ferreteria del centro',
            'timestamp': new Date(new Date().getTime() + 3*60*1000).toLocaleDateString('es-MX', options),
        },
        {
            'group': 2,
            'from': username,
            'msg': 'Ten cuidado, hay muchos zombies por la zona',
            'timestamp': new Date(new Date().getTime() + 6*60*1000).toLocaleDateString('es-MX', options),
        }
        

    ];

    const [alerts, setAlerts] = useState(alerts_data);
    const [messages, setMessages] = useState(messages_data);
    const [msg, setMsg] = useState('');

    const port = 9999;
    const socket = io('http://localhost:' + port.toString())

    socket.on('connect', () => {
        console.log('Connected to server!');
    })

    socket.on('fetch', new_alerts => {
        // Update alertas
        setAlerts(alerts => {
            let updated_alerts = alerts.concat(new_alerts);
            return updated_alerts;
        })
    })
    socket.on('group', group_messages => {
        // Update messages
        setMessages(messages => {
            let updated_messages = messages.concat(group_messages);
            return updated_messages;
        })
    })
    useEffect(() => {
        socket.emit('fetch');
    }, [])
    // TODO: Poner aqui la logica para recibir datos y pasarlos al channel hijo

    const dummy = useRef();
    
    let sendAlert = (e) => {
        e.preventDefault();

        let alert_data = {
            'alertId': alerts.length+1,
            'reporter': username,
            'alert': msg,
            'danger': 'medio',
            'timestamp': new Date().toLocaleDateString('es-MX', options)
        }

        setAlerts(alerts => {
            let updated_alerts = alerts.concat(alert_data)
            return updated_alerts.sort((al1, al2) => new Date(al1.timestamp) - new Date(al2.timestamp))
        })

        socket.emit('alert', alert_data)

        setMsg('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    let sendMessageToGroup = (e) => {
        e.preventDefault();

        let msg_data = {
            'group': group,
            'from': username,
            'msg': msg,
            'timestamp': new Date().toLocaleDateString('es-MX', options),
        }

        setMessages(messages => {
            let updated_messages = messages.concat(msg_data)
            return updated_messages;
        })

        socket.emit('group', msg_data)

        setMsg('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
        <main>
            {
                group === 1
                ?   <>{ alerts && alerts
                        .reverse()
                        .map(alrt => <AlertMessage key={alrt.alertId} alert_data={alrt} />) 
                    }</>
                :   <>{ messages && messages
                            .filter(message => message.group === group)
                            .map((message, i) => <GroupMessage key={i} message_data={message} username={username} />) 
                    }</>
            }
            <span ref={dummy}></span>
        </main>
    
        <form onSubmit={group === 0 ? sendAlert : sendMessageToGroup }>
    
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="¿Alguna nueva alerta?" />
    
            <button type="submit" disabled={!msg}>🕊️</button>
    
        </form>
    </>)
}

export default ChannelRender;



let options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};