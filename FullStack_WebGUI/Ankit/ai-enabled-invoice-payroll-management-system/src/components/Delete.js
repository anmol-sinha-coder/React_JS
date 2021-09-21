import React from 'react';
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Select } from "@material-ui/core";
import axios from "axios";
import Alert from './Snackbar';

const useStyles = makeStyles((theme) => ({
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
  Typography : {
    color  : '#BCC2C6'
  }
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
    padding: theme.spacing(1),
    color: "white",
    backgroundColor: "#2A3E4C",
  },
}))(MuiDialogActions);

 function Delete({selected}) {
   console.log("slected ",selected)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); 
  
    const deleteHandler = () => {      
      for (var i = 0; i < selected.length; i++) {      
         axios
           .get(
             `http://localhost:8080/1806020/deleteInvoice?doc_id=${selected[i]}`
           )
           .then((data) => {
            <Alert message="Response is recorded!" />
           })
           .catch((err) =>  <Alert message="Oppss something wrong!" />);        
       }      
       setOpen(false);
      }   
    


  const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        size="small"
        style={{
          textTransform: "none",
          color: "#97A1A9",
          borderColor: "#97A1A9",
          borderRadius: "8px",
        }}
      >
        <RemoveIcon fontSize="small" /> Delete
      </Button>
     
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Delete record(s)?
        </DialogTitle>
        <DialogContent dividers>
        
              <Typography className={classes.Typography}>
                You'll lose your record(s) after this action.We can't recover
                them once you deleted.
              </Typography>
              <Typography className={classes.Typography}>
                Are you sure ypu want to{" "}
                <span style={{ color: "#d4585b" }}>permanently delete</span>{" "}
                them?
              </Typography>           
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            className={classes.resetBtn}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            autoFocus
            className={classes.saveBtn}
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
}


export default Delete;