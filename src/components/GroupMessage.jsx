import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import '../App.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import SecurityIcon from '@mui/icons-material/Security';

let GroupMessage = ({ message_data, username }) => {
    const { msg, from, timestamp } = message_data;
    let danger = "bajo"
    const bl_class = username === from;
    const messageClass = bl_class ? 'sent' : 'received';

    return (<>
        <ListItem alignItems="flex-start">
            {  !bl_class && 
                <ListItemAvatar>
                    <Avatar alt={from} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
            }
           
            
            <ListItemText
                className={messageClass}
                primary={
                    <React.Fragment>
                    <Typography
                        className={bl_class ? "sentTitle" : ""}
                        sx={{ display: 'inline' }}
                        component="span"    
                        variant="h5"
                        color="text.primary"
                    >
                        {from}
                        <Typography
                        className={bl_class ? "sentTitle" : ""}
                        sx={{ display: 'inline' }}
                        component="span"
                    >{"   -   " + timestamp}</Typography>
                        
                    </Typography>    
                    {!bl_class && <ListItemIcon fontSize="large">
                {
                danger == "alto" 
                ?   <ReportProblemIcon color="error" />
                :   danger == "medio" 
                    ?   <WarningAmberIcon color="warning" /> 
                    :   danger == "bajo" 
                        ? <GppMaybeIcon color="success" />
                        : <SecurityIcon color="info"/> 
                }
            </ListItemIcon>}
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>

                    <Typography
                        sx={{ display: 'inline', float: 'inline-end' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {msg}
                    </Typography>
                    </React.Fragment>
                }
            />
            {bl_class && <ListItemIcon fontSize="large">
                {
                danger == "alto" 
                ?   <ReportProblemIcon color="error" />
                :   danger == "medio" 
                    ?   <WarningAmberIcon color="warning" /> 
                    :   danger == "bajo" 
                        ? <GppMaybeIcon color="success" />
                        : <SecurityIcon color="info"/> 
                }
            </ListItemIcon>}
        {  bl_class &&
                <ListItemAvatar>
                    <Avatar alt={from} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
        }
      </ListItem>
      <Divider variant="inset" component="li" />
    </>)
}

export default GroupMessage