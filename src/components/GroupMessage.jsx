import { Grid } from '@mui/material';
import React from 'react';
import '../App.css';


let GroupMessage = ({ message_data, username }) => {
    const { msg, from, timestamp } = message_data;
  
    const messageClass = username === from ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid 
                    item
                    xs={2}
                >
                    <img src={'assets/alert.png'} alt="alerta"/>
                </Grid>
                <Grid
                    item
                    xs={8}    
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid 
                            item
                            xs={12}
                        >
                            <p>{msg}</p>
                        </Grid>
                        <Grid 
                            item
                            xs={12}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                 <Grid 
                                    item
                                    xs={12}
                                >
                                    <p>Reportado por: {from}</p>
                                </Grid>    
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item
                    xs={2}
                >
                    <p>{timestamp}</p>
                </Grid>
            </Grid>
        </div>
    </>)
}

export default GroupMessage