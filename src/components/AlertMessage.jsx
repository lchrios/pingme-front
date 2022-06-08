import { Grid, Icon, ListItemIcon } from '@mui/material';
import React from 'react';
import '../App.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import SecurityIcon from '@mui/icons-material/Security';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


let AlertMessage = ({ alert_data }) => {
    const { alertId, danger, reporter, alert, timestamp } = alert_data;
    
    return (<>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar alt={reporter} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            
            <ListItemText
            primary={alertId+": "+alert}
            secondary={
                <React.Fragment>

                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {reporter}
                </Typography>
                {"   -   " + timestamp}
                </React.Fragment>
            }
            />
            <ListItemIcon fontSize="large"
            >
            {
                danger == "alto" 
                ?   <ReportProblemIcon color="error" />
                :   danger == "medio" 
                    ?   <WarningAmberIcon color="warning" /> 
                    :   danger == "bajo" 
                        ? <GppMaybeIcon color="success" />
                        : <SecurityIcon color="info"/> 
            }
        </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>)
}
export default AlertMessage