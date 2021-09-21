import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import html2canvas from "html2canvas";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import jsPDF from "jspdf";
import axios from "axios";

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
    padding: theme.spacing(2),
    color: "white",
    backgroundColor: "#2A3E4C",
    borderTop: "1px solid white",
  },
}))(MuiDialogActions);

function createData(name, calories, fat, carbs, protein, Amount) {
  return { name, calories, fat, carbs, protein, Amount };
}

export default function Correspondence({ select, page, count }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  console.log("corr", select);

  console.log("data", data);
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    for (var i = 0; i < select.length; i++) {
      axios
        .get(
          `http://localhost:8080/1806020/correspondenceData?invoice_no=${select[i]}`
        )
        .then((data) => {
          setData((prev) => [...prev, ...data.data]);
        })
        .catch((err) => console.log("error"));
    }
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
        View Correspondence
      </Button>
      <MuiThemeProvider theme={theme}>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="lg"
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography variant="h6">View Correspondence({count})</Typography>
          </DialogTitle>
          <DialogContent dividers id="divToPrint">
            <Typography variant="subtitle2">
              Subject:<span>Invoice Details-{} </span>
            </Typography>
            <br />
            <Typography variant="subtitle2">
              Dear Sir/Madam,
              <br />
              Greetings!
            </Typography>
            <br />
            <Typography variant="subtitle2">
              This is to remind you that there are one or more open invoices on
              your account.Please provide at your earliest convenience an update
              on the payment details or clarify the reason for the delay. It you
              have any specific issue with theinvoice(s), please let us know so
              that we can address it to the correct Department.
            </Typography>
            <br />
            <Typography variant="subtitle2">
              Please find the details of the invoices below:
            </Typography>
            <br />
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead style={{ borderBottom: "1.5px solid #1D2C36" }}>
                  <TableRow>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Invoice Number
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }} align="left">
                      PO Number
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }} align="left">
                      Invoice Date
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }} align="left">
                      Due Date
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }} align="left">
                      Currency
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }} align="left">
                      Open Amount($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data ? (
                    data.map((row, index) => (
                      <TableRow
                        key={index}
                        style={
                          index % 2
                            ? { background: "#203c4f" }
                            : { background: "#2A3E4C" }
                        }
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ color: "#EBEDEE" }}
                        >
                          {row.invoice_number}
                        </TableCell>
                        <TableCell style={{ color: "#EBEDEE" }} align="left">
                          {row.po_number}
                        </TableCell>
                        <TableCell style={{ color: "#EBEDEE" }} align="left">
                          {row.invoice_date}
                        </TableCell>
                        <TableCell style={{ color: "#EBEDEE" }} align="left">
                          {row.due_date}
                        </TableCell>
                        <TableCell style={{ color: "#EBEDEE" }} align="left">
                          {row.currency}
                        </TableCell>
                        <TableCell style={{ color: "#EBEDEE" }} align="left">
                          {row.total_open_amount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <span>nothing</span>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Typography variant="subtitle2">
              Total Amout to be Paid: $124.00k
            </Typography>
            <br />
            <Typography variant="subtitle2">
              In case you have already made a payment for the above items,
              please send us the details to ensure the payment is posted.
              <br />
              Let us know if we can be of any further assistance. Looking
              forward to hearing from you.
            </Typography>
            <br />
            <Typography variant="subtitle2">
              Kind Regards,
              <br />
              Ankit Yadav <br />
              Phone : 7001739196 <br />
              Fax : [if any] <br />
              Email : ankityadav66666@gmail.com <br />
              Company Name: HRC
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button className={classes.btn} size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="small"
              className={classes.download}
              onClick={printDocument}
            >
              Downlaod
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btn: {
    color: "#14AFF1",
    textTransform: "none",
    textAlign: "start",
    padding: theme.spacing(0, 5, 0, 0),
  },
  download: {
    color: "white",
    background: "#14AFF1",
    textTransform: "none",
  },
  spanText: {
    color: "#FFFFFF",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      subtitle2: {
        color: "#C0C6CA",
      },
      subheading: {
        color: "red",
      },
    },
    MuiDialog: {
      background: "red",
    },

    MuiTableCell: {
      root: {
        backgroundColor: "#2A3E4C",
        borderBottom: "none",
      },
    },
  },
});
