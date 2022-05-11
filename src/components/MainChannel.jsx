import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

import AlertMessage from './AlertMessage';


let MainChannel = ({ auth, username, socket }) => {
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const [alerts, setAlerts] = useState([
        {
            'alertId': 1,
            'reporter': username,
            'alert': 'Zombies cayendo a la base',
            'danger': 'medio',
            'timestamp': new Date().toLocaleDateString('es-MX',options),
        },
        {
            'alertId': 2,
            'reporter': username,
            'alert': 'Supervivientes encontrads',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() + 3*60*1000).toLocaleDateString('es-MX',options),
        },
        {
            'alertId': 3,
            'reporter': username,
            'alert': 'Alianza con otra comunidad',
            'danger': 'medio',
            'timestamp': new Date(new Date().getTime() + 6*60*1000).toLocaleDateString('es-MX',options),
        },
    ]);

    const dummy = useRef();
    const [formValue, setFormValue] = useState('');

    
    useEffect(() => {
        socket.emit('fetch');
    }, [])

    let sendAlert = (e) => {
        e.preventDefault();

        let alert_data = {
            'alertId': alerts.length,
            'reporter': username,
            'alert': formValue,
            'danger': 'medio',
            'timestamp': new Date().toLocaleDateString('es-MX', options)
        }

        setAlerts(alerts => {
            let updated_alerts = alerts.concat(alert_data).reverse()
            return updated_alerts
        })

        socket.emit('alert', alert_data)

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

  
    return (<>
        <main>
            {alerts && alerts.map(alrt => <AlertMessage auth={auth} key={alrt.alertId} alert_data={alrt} />)}
            <span ref={dummy}></span>
            
            
    
        </main>
    
        <form onSubmit={sendAlert}>
    
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="¿Alguna nueva alerta?" />
    
            <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
    </>)
  }

export default MainChannel