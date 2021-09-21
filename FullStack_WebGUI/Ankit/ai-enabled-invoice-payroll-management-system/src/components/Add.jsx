import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
import Alert from './Snackbar';

export default function Add({select}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [invoice, setInvoice] = useState("");
  const [invoiveAmount, setInvoiceAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .get(
        `http://localhost:8080/1806020/addInvoice?cust_number=${customerNo}&name_customer=${name}&doc_id=${invoice}&due_in_date=${dueDate}&total_open_amount=${invoiveAmount}&notes=${notes}`
      )
      .then((data) => {
        <Alert message="Response is successfully submitted!" />;
      })
      .catch((err) => <Alert message="Oppss Something Wrong Happend!" />);

    setOpen(false);
    setName("");
    setName("");
    setCustomerNo("");
    setInvoice("");
    setInvoiceAmount("");
    setDueDate("");
    setNotes("");
  };

  const handleReset = () => {
    setName("");
    setName("");
    setCustomerNo("");
    setInvoice("");
    setInvoiceAmount("");
    setDueDate("");
    setNotes("");
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        
        style={
          select.length > 0
            ? {
                color: "#14AFF1",
                textTransform: "none",
                color: "#97A1A9",
                borderColor: "#14AFF1",
                borderRadius: "8px",
              }
            : {               
                textTransform: "none",
                color: "#97A1A9",
                borderColor: "#97A1A9",
                borderRadius: "8px",
              }
        }
        onClick={select.length && handleClickOpen}
      >
        <AddIcon fontSize="small" /> Add
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Invoice
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid container item xs={6} spacing={3}>
              <Grid item xs={5}>
                <Typography className={classes.text} display="block">
                  Customer name{<span style={{ color: "#DF5759" }}>*</span>}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <InputBase
                  placeholder="jassica"
                  inputProps={{ className: classes.inputBox }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.text} display="block">
                  Customer No.{<span style={{ color: "#DF5759" }}>*</span>}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <InputBase
                  inputProps={{ className: classes.inputBox }}
                  value={customerNo}
                  onChange={(e) => setCustomerNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.text} display="block">
                  Invoice No.{<span style={{ color: "#DF5759" }}>*</span>}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <InputBase
                  inputProps={{ className: classes.inputBox }}
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography className={classes.text} display="block">
                  Invoice Amount{<span style={{ color: "#DF5759" }}>*</span>}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <InputBase
                  inputProps={{ className: classes.inputBox }}
                  value={invoiveAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={2}>
              <Grid item xs={5}>
                <Typography className={classes.text} align="center">
                  Due Date{<span style={{ color: "#DF5759" }}>*</span>}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <InputBase
                  type="date"
                  inputProps={{ className: classes.inputBox }}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={5} className={classes.text} align="center">
                Notes
              </Grid>
              <Grid item xs={7}>
                <TextField
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={classes.textField}
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.btn}
            size="small"
            style={{ marginRight: "auto" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            className={classes.resetBtn}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            size="small"
            autoFocus
            className={classes.saveBtn}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  btn: {
    color: "#14AFF1",
    textTransform: "none",
    textAlign: "start",
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

  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
    width: 180,
    background: "#283A46",
    border: "1px solid #14AFF1",
    borderRadius: "7px",
    "& .Mui-focused": {
      color: "white",
    },
  },
  text: {
    color: "#919CA4",
    fontSize: 14,
    padding: theme.spacing(0.7),
  },
  inputBox: {
    fontFamily: "nunito",
    color: "white",
    background: "#283A46",
    border: "1px solid #14AFF1",
    borderRadius: "7px",
    padding: theme.spacing(0.6, 1, 0.6, 1),
  },
  paper: {
    width: 750,
    height: 370,
  },
}));

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
    color: theme.palette.grey[500],
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
    color: "white",
    backgroundColor: "#2A3E4C",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.8),
    color: "white",
    backgroundColor: "#2A3E4C",
  },
}))(MuiDialogActions);
