import React, { useRef, useState } from 'react';
import '../App.css';

import AlertMessage from './AlertMessage';


let MainChannel = ({ auth, username, socket }) => {
    
    const [alerts, setAlerts] = useState([
        {
            'alertId': 1,
            'reporter': username,
            'alert': 'Zombies cayendo a la base',
            'danger': 'medio',
            'timestamp': new Date().toISOString,
        },
        {
            'alertId': 2,
            'reporter': username,
            'alert': 'Supervivientes encontrads',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() + 3*60*1000).toISOString,
        },
        {
            'alertId': 3,
            'reporter': username,
            'alert': 'Alianza con otra comunidad',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() + 6*60*1000).toISOString,
        },
    ]);

    const dummy = useRef();
    const [formValue, setFormValue] = useState('');


    let fetchAlerts = () => {
        socket.emit('fetch');
    }

    let sendAlert = (e) => {
        e.preventDefault();

        let alert_data = {
            'alertId': alerts.length,
            'reporter': username,
            'alert': formValue,
            'danger': 'medio',
            'timestamp': new Date().toISOString
        }

        setAlerts(alerts => {
            let updated_alerts = alerts.concat(alert_data)
            return updated_alerts
        })
        socket.emit('alert', alert_data)
    }

  
    return (<>
        <main>
  
            {alerts && alerts.map(alrt => <AlertMessage auth={auth} key={alrt.alertId} alert_data={alrt} />)}
    
            <span ref={dummy}></span>
    
        </main>
    
        <form onSubmit={sendAlert}>
    
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
            <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
    </>)
  }

export default MainChannel