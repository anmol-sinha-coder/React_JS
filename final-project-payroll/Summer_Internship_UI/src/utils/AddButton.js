import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
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
    modal:{
      flexDirection:"row",
    },
    dialog_box: {
        backgroundColor: '#2A3E4C',
        color:"#ffffff",
        width:"30rem",
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

var AddButton = () => {
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
  const [dataValue3, setData3]=useState("");
  const [dataValue4, setData4]=useState("");
  const [dataValue5, setData5]=useState("");
  
  var valueSet=["","","","",""];
  const handleChange1 = (event) => {
    valueSet[1-1] = event.target.value;
    setData1(valueSet[1-1]);
  };

  const handleChange2 = (event) => {
    valueSet[2-1] = event.target.value;
    setData2(valueSet[2-1]);
  };
  const handleChange3 = (event) => {
    valueSet[3-1] = event.target.value;
    setData3(valueSet[3-1]);
  };
  const handleChange4 = (event) => {
    valueSet[4-1] = event.target.value;
    setData4(valueSet[4-1]);
  };
  const handleChange5 = (event) => {
    valueSet[5-1] = event.target.value;
    setData5(valueSet[5-1]);
  };

  const postResults = (val1,val2,val3,val4,val5) => {
    axios.get(`http://localhost:8000/1805553_HRC/AddData?cust_number=${val1}&name_customer=${val2}&due_in_date=${val3}&invoice_id=${val4}&total_open_amount=${val5}`)
      .then((response) => {
        setDataRows([...response.data]);
      })
      .then((error) => {
        console.log("Error", error);
      });
  };

  const handleSubmit = (event) => {
    console.log(...valueSet);
    postResults(dataValue1.toString(),dataValue2.toString(),dataValue3.toString(),dataValue4.toString(),dataValue5.toString());
  };

return(
    <>
    <Button className={classes.buttons} variant="outlined" color="Primary" onClick={handleClickOpen}>+ Add</Button>
    <Dialog className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-titles">
        <DialogTitle className={classes.dialog_box} id="form-dialog-titles"><b><u>Add Invoice</u></b> </DialogTitle>
    <DialogContent className={classes.dialog_box}>
     <Grid container spacing={24} xs={12}>
      <Grid xs={6}>
        Customer Number:
      </Grid >
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            onChange={handleChange1}
            floatingLabelText="Customer Name"
        />
     </Grid>
    </Grid>
    <Grid container spacing={6} xs={12}>
      <Grid xs={6}>
        Name of Customer:
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            onChange={handleChange2}
            floatingLabelText="Customer Name"
        />
     </Grid>
    </Grid>
    <Grid container spacing={6} xs={12}>
      <Grid xs={6}>
        Due Date (DD/MM/YYYY):
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            onChange={handleChange3}
            floatingLabelText="Customer Name"
        />
     </Grid>
    </Grid>
    <Grid container spacing={6} xs={12}>
      <Grid xs={6}>
        Invoice ID:
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            onChange={handleChange4}
            floatingLabelText="Customer Name"
        />
     </Grid>
    </Grid>
    <Grid container spacing={6} xs={12}>
      <Grid xs={6}>
        Total Amount:
      </Grid>
      <Grid xs={6}>
        <TextField
            className={classes.input_field}
            variant="outlined"
            id="name"
            name="customer_name"
            hintText="Customer Name"
            onChange={handleChange5}
            floatingLabelText="Customer Name"
        />
     </Grid>
    </Grid>
    </DialogContent>

        <DialogActions className={classes.dialog_box}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
 );
}

export default AddButton;