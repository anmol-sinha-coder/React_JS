import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0',
  },
  head: {
    backgroundColor:"#1A262F",
    color: theme.palette.common.white,
  },
  body: {
    color:"#ffffff",
    fontSize: '1rem',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    height:30,
    '&:nth-of-type(odd)': {
      backgroundColor: '#283a46', //theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#283a40', //theme.palette.action.hover,
    },
  },
}))(TableRow);

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
    modal:{
      flexDirection:"row",
    },
    dialog_box: {
        backgroundColor: '#2A3E4C',
        color:"#ffffff",
        width:"80vw",
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

var ViewButton = () => {
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
    <Button className={classes.corr_button} variant="outlined" color="inherit" onClick={handleClickOpen}>View Correspondence</Button>
    <Dialog className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-titles">
        <DialogTitle className={classes.dialog_box} id="form-dialog-titles"><b><u>View Correspondence Data</u></b> </DialogTitle>
    <DialogContent className={classes.dialog_box}>
     
    <Grid container spacing={24} xs={12}>
      <Grid xs={12}>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer No.</StyledTableCell>
            <StyledTableCell align="center">Invoice No.</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Due Date</StyledTableCell>
            <StyledTableCell align="center">Predicted Payment<br></br> Date</StyledTableCell>
            <StyledTableCell align="center">Predicted Ageing<br></br>Bucket</StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
      </TableContainer>
     </Grid>
    </Grid>
    </DialogContent>

        <DialogActions className={classes.dialog_box}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

 </>
 );
}

export default ViewButton;