import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    buttons: {
      alignItems:'right',
      backgroundColor: '#283a47',
      textTransform: 'none',
      color:"#ffffff",
      outlineColor:"#14AFF1",
      width: '7vw',
      height: '7vh',
      margin: "0.5vw",
    },

  }));

var DeleteButton = () => {
    const classes = useStyles();
return(
    <Button className={classes.buttons} variant="outlined" color="Primary">– Delete</Button>

 );
}

export default DeleteButton;