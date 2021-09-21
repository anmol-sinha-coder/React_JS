import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Alert from './Snackbar';
import { makeStyles, Snackbar } from "@material-ui/core";


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "white",
    backgroundColor: "#2A3E4C",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#C0C6CA",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#2A3E4C",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#2A3E4C",
  },
}))(MuiDialogActions);

export default function Edit({select}) {
  const classes = useStyles();

  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [notes, setNotes] = useState("");
  console.log(invoiceAmount)
  console.log(notes)
  const [open, setOpen] = React.useState(false);
console.log("s",select)
  const handleCheck = () => {
    axios
      .get(
        `http://localhost:8080/1806020/editInvoice?doc_id=${select}&total_open_amount=${invoiceAmount}&notes=${notes}`
      )
      .then((data) => {
        <Alert message="Response is successfully submitted!" />
      })
      .catch((err) => <Alert message="Oppss Something Wrong Happend!" />);
      setOpen(false);

  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        className={classes.editBtn}
        onClick={handleClickOpen}
      >
        
        <EditIcon fontSize="small" />
        Edit
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Invoice
        </DialogTitle>
        <DialogContent dividers={true}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Typography style={{ color: "#97A1A9" }} variant="subtitle2">
                Invoice Amount
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <form noValidate autoComplete="off">
                <InputBase
                  className={classes.textField}
                  placeholder="$ 576.00"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  inputProps={{
                    style: {
                      fontFamily: "nunito",
                      color: "white",
                      padding: "0.5vw",
                    },
                  }}
                />
              </form>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Typography style={{ color: "#97A1A9" }} variant="subtitle2">
                Notes
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <form noValidate autoComplete="off">
                <TextField
                  className={classes.textField}
                  id="outlined-multiline-static"
                  multiline
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  variant="outlined"
                />
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            className={classes.btn}
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            className={classes.resetBtn}
            onClick={handleCheck}
          >
            Reset
          </Button>
          <Button
            size="small"
            autoFocus
            className={classes.saveBtn}
            onClick={handleCheck}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#14AFF1",
    textTransform: "none",
    textAlign: "start",
    marginRight: "auto"
  },
  resetBtn: {
    color: "white",
    border: "1px solid #14AFF1",
    textTransform: "none",
  },
  saveBtn: {
    color: "white",
    background: "#14AFF1",
    textTransform: "none",
  },
  editBtn: {
    textTransform: "none",
    color: "#97A1A9",
    borderColor: "#97A1A9",
    borderRadius: "8px",
  },
  textField: {
    border: "1px solid #356680",
    borderRadius: "5px",
    background: "#283A46",
    margin: theme.spacing(1, 0, 1, 0),
    fontSize: 15,
    "&:hover": {
      borderColor: "#1AAFF1",
    },
    "&:focus": {
      border: "white",
    },
  },
}));
