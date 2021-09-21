import React from 'react';
import Logo from '../assets/images/logo.png'
import HRCLogo from '../assets/images/hrcLogo.png'
import './headerSection.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {   
    padding: theme.spacing(1),
    color : 'white'
  },
}));
function HeaderSection() {
    const classes = useStyles();
    return (
        <>
            <div className="header_main">
                <div className="logo">
                <img src={Logo} 
                alt="logo1" />
                 <Typography className={classes.root} variant="h6" >
                Invoice List
                </Typography>
                </div>
                <div className="hrcLogo">
                <img src={HRCLogo} 
                alt="logo1" />
                 </div>
            
            </div>
           
        </>
    )
}

export default HeaderSection;
