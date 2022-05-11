import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

let ChannelRender = ({ channel, auth, firestore, username, socket }) => {

    return (<>
        { 
            channel === 'Alerts Channel'
            ?   <MainChannel auth={auth} firestore={firestore} username={username} socket={socket}  />
            :   <GroupChannel auth={auth} firestore={firestore} username={username} socket={socket} group={channel} />
        }
    </>)
}

export default ChannelRender;