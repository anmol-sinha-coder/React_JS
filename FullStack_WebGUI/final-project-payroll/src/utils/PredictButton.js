import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    predict_button: {
      backgroundColor:"#97A1A9",
      textTransform: 'none',
      color:"#ffffff",
      marginRight:'1rem',
    "&:hover": { backgroundColor:"#14AFF1",},
    "&:active": { backgroundColor:"#000000",},
    },
  }));

var PredictButton = () => {
    const classes = useStyles();

return(
    <Button className={classes.predict_button} variant="contained">Predict</Button>

 );
}

export default PredictButton;