import React, { useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import edit from '../assets/Path 18191.svg';
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

    dialog_box: {

        backgroundColor: '#2A3E4C',
    },
  }));

var EditButton = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
return(
    <>
    <Button className={classes.buttons} variant="outlined" color="Primary" onClick={handleClickOpen}><img src={edit}/> &nbsp;Edit </Button>

    </>
 );
}

export default EditButton;