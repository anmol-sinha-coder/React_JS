import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import formatter from '../utils/formatter';
import SearchText from '../utils/SearchText';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  table_style: {
    height:"1 rem",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '0',
  },
  head: {
    backgroundColor: theme.palette.common.black,
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

/*
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/
/*
const useStyles = makeStyles({
  table: {
    minWidth: 700,
    backgroundColor:'#283a46',
  },
});
*/

const json_size=50000;
var DataTable = () => {
 /* const classes = useStyles(); */
 var [responseData, setResponseData] = React.useState([]);
 let [isNext, isNextFunc] = React.useState(false);
 let [pageCount, setCount] = React.useState(1);

 const fetchData = () => {
   axios.get(
     `http://localhost:8000/1805553_HRC/dummy.do`
     )
     .then((response) => {
       setResponseData([...responseData, ...response.data]);
     })
     .catch((error) => {
       console.log(`Inside DataTable.js ${error}`);
     });
 };

 useEffect( () =>{
  fetchData();
},[]);

const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table_style}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left"> <Checkbox se/> </StyledTableCell>
            <StyledTableCell align="center">Customer Name</StyledTableCell>
            <StyledTableCell align="center">Customer No.</StyledTableCell>
            <StyledTableCell align="center">Invoice No.</StyledTableCell>
            <StyledTableCell align="center">Total Amount</StyledTableCell>
            <StyledTableCell align="center">Due Date</StyledTableCell>
            <StyledTableCell align="center">Predicted Payment<br></br> Date</StyledTableCell>
            <StyledTableCell align="center">Predicted Ageing<br></br>Bucket</StyledTableCell>
            <StyledTableCell align="center">Notes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responseData.map((data, index) => (
            <StyledTableRow key={index} maxHeight="0 rem">
              <StyledTableCell component="th" scope="row"> <Checkbox/> </StyledTableCell>
              <StyledTableCell align="center">{data.name_customer}</StyledTableCell>
              <StyledTableCell align="center">{data.cust_number}</StyledTableCell>
              <StyledTableCell align="center">{data.invoice_id}</StyledTableCell>
              <StyledTableCell align="center">{data.total_open_amount}</StyledTableCell>
              <StyledTableCell align="center">{data.due_in_date}</StyledTableCell>
              <StyledTableCell align="center"> - </StyledTableCell>
              <StyledTableCell align="center"> - </StyledTableCell>
              <StyledTableCell align="center">Nothing</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;