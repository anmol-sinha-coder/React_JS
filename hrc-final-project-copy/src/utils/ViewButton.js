import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    corr_button: {
      backgroundColor: '#283a47',
      textTransform: 'none',
      color:"#ffffff",
      marginRight:"35vw",
    },
  }));

var ViewButton = () => {
    const classes = useStyles();
return(
    <Button className={classes.corr_button} variant="outlined" color="inherit">View Correspondence</Button>
 );
}

export default ViewButton;