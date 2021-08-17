import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import edit from '../assets/Path 18191.svg';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

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

    const [dataRows,setDataRows]=useState([]);
    const [dataValue1, setData1]=useState("");
    const [dataValue2, setData2]=useState("");

    var valueSet=["",""];
    const handleChange1 = (event) => {
      valueSet[1-1] = event.target.value;
      setData1(valueSet[1-1]);
    };
    const handleChange2 = (event) => {
      valueSet[2-1] = event.target.value;
      setData2(valueSet[2-1]);
    };

    const postResults = (val1, val2) => {
      axios.get(`http://localhost:8000/1805553_HRC/EditData?invoice_id=${val1}&total_open_amount=${val2}`)
        .then((response) => {
          setDataRows([...response.data]);
        })
        .then((error) => {
          console.log("Error", error);
        });
    };

    const handleEdit = (event) => {
      console.log(valueSet);
      postResults(dataValue1.toString(), dataValue2.toString());
      handleClose();
    };

return(
    <>
    <Button className={classes.buttons} variant="outlined" color="Primary" onClick={handleClickOpen}><img src={edit}/> &nbsp;Edit </Button>
    <Dialog className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-titles">
        <DialogTitle className={classes.dialog_box} id="form-dialog-titles"><b><u>Delete Invoice</u></b> </DialogTitle>
    <DialogContent className={classes.dialog_box}>
     
    <Grid container spacing={12} xs={12}>
      <Grid xs={6}>
        Invoice ID:
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="invoice id"
            hintText="Invoice ID"
            onChange={handleChange1}
            floatingLabelText="Invoice ID"
        />
     </Grid>
    </Grid>
    <Grid container spacing={12} xs={12}>
      <Grid xs={6}>
        Total Amount:
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="invoice id"
            hintText="Invoice ID"
            onChange={handleChange2}
            floatingLabelText="Invoice ID"
        />
     </Grid>
    </Grid>
    </DialogContent>

        <DialogActions className={classes.dialog_box}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

  </>
 );
}

export default EditButton;