import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { render } from 'react-dom';

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
    modal:{
      flexDirection:"row",
    },
    dialog_box: {
        backgroundColor: '#2A3E4C',
        color:"#ffffff",
        width:"16vw",
    },
    input_field: {
        '& label': {
          color:'#99A4AC',
          opacity:1,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#97A1A9',
          },
        },
        flexDirection:"row",
        borderColor: '#97A1A9',
        height:"2vw",
        width: '8vw',
        padding:"2vw 2vh",
        margin:'0',
        color:'#97A1A9',
    },
  }));

var DeleteButton = () => {
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
    var valueSet;
    const handleChange1 = (event) => {
      valueSet = event.target.value;
      setData1(valueSet);
    };

    const postResults = (val1) => {
      axios.get(`http://localhost:8000/1805553_HRC/DeleteData?invoice_id=${val1}`)
        .then((response) => {
          setDataRows([...response.data]);
        })
        .then((error) => {
          console.log("Error", error);
        });
    };

    const handleDelete = (event) => {
      console.log(valueSet);
      postResults(dataValue1.toString());
    };

return(
  <>
    <Button className={classes.buttons} variant="outlined" color="Primary" onClick={handleClickOpen}>– Delete</Button>
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
    </DialogContent>

        <DialogActions className={classes.dialog_box}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

  </>
    )
}
export default DeleteButton;