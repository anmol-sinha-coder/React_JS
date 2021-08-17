import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
    modal: {
        
    },
    dialog_box: {
        backgroundColor: '#2A3E4C',
        fontSize:"1rem",
    },
    input_field: {
        size:"small",
        height:"1.2 rem",
        //padding:"0.1 rem",
        margin:"0",
        ///color:"Primary",
        outlineColor:'Primary',
    },
  }));

var AddButton = () => {
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
    <Button className={classes.buttons} variant="outlined" color="Primary" onClick={handleClickOpen}>+ Add</Button>
    <Dialog className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-titles">
        <DialogTitle className={classes.dialog_box} id="form-dialog-titles">Add Invoice</DialogTitle>
    <DialogContent className={classes.dialog_box}>
     <Grid container spacing={6}>
      <Grid>
        Customer Name:
      </Grid>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            floatingLabelText="Customer Name"
        />
     </Grid>    
    </DialogContent>

        <DialogActions className={classes.dialog_box}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
 );
}

export default AddButton;