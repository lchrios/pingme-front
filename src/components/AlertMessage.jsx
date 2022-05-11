import { Grid } from '@mui/material';
import React from 'react';
import '../App.css';


let AlertMessage = ({ alert_data }) => {
    const { alertId, danger, reporter, alert, timestamp } = alert_data;
  
    return (<>
        <div className={`message alert`}>
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
                            <p>{alert}</p>
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
                                    xs={8}
                                >
                                    <p>Reportado por: {reporter}</p>
                                </Grid>
                                <Grid 
                                    item
                                    xs={4}
                                >
                                    <p>Peligro: {danger}</p>
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

export default AlertMessage