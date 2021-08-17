import React, {useState, useEffect} from 'react';
  //import DataTable from "../utils/DataTable";
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
  import { Checkbox } from '@material-ui/core';
  import PredictButton from "../utils/PredictButton";
  import ViewButton from "../utils/ViewButton";
  import AddButton from "../utils/AddButton";
  import EditButton from "../utils/EditButton";
  import DeleteButton from "../utils/DeleteButton";
  //import SearchText from "../utils/SearchText";
  import Grid from '@material-ui/core/Grid';
  import Paper from '@material-ui/core/Paper';
  import { withStyles, makeStyles } from '@material-ui/core/styles';
  import axios from "axios";
  import TextField from '@material-ui/core/TextField';
  import { CircularProgress } from "@material-ui/core";
  import InfiniteScroll from "react-infinite-scroll-component";


  import wrong_symbol from '../assets/Path 18298.svg';  

  
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

    paper: {
      padding: "1rem",
      backgroundColor: '#283a47',
    },

    search_bar: {
      flexDirection:"row",
      '& label': {
        color:'#99A4AC',
        opacity:1,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#97A1A9',
        },
      },
      "& .MuiInputBase-root": {
        color: "#ffffff",
    },        
      borderColor: '#97A1A9',
      height: '6vh',
      width: '15vw',
      padding:"1vh 1vw",
      margin:'0.5vw 0.25vh',
      color:'#97A1A9',
    },
  }));
  
  const MainGrid = ({title}) => {

    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();
    const handleChange = (event) => {
      setSpacing(Number(event.target.value));
    };
    var [responseData, setResponseData] = useState([]);
    let [isNext, isNextFunc] = React.useState(false);
    let [pageCount, setPageCount] = React.useState(1);
    /*
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
    */

    var [dataRows,setdataRows] = useState([]);
    const [selected, setSelected] = useState(false);
    const [searchValue, setSearchValue] = useState("");
  
    const pageLimit=8;
    const getSearchResults = (value) => {
      axios
        .get(`http://localhost:8000/1805553_HRC/SearchData`, {
          params: {
            invoice_id : value,
            page: pageCount,
            limit: pageLimit
          }
        })
        .then((response) => {
          setdataRows([...response.data]);
        })
        .then((error) => {
          console.log("Error", error);
        });
    };
  
    let debounceTimer;
    const handleSearchValueChange = (event) => {
      const newSearchVal = event.target.value;
      setSearchValue(newSearchVal);
      if (newSearchVal === "")
        {
          console.log("here")
          setdataRows([]);
          console.log("empty")
          setPageCount(1);
        }
      else {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          getSearchResults(newSearchVal);
        }, 3000);
      }
    };
  
    const findIndex = ((val) => {
      for(let i=0;i<dataRows.length;i++)
        if(dataRows[i].invoice_id === val)
          return dataRows[i];
    })

    let handleSelection = (event) => {
      const ifSelected=event.target.checked;
      if(ifSelected === false)
       setSelected(true);
      else
       setSelected(false);
    }

    let fetchMoreData = () => {
      setPageCount(pageCount + 1);
      if(pageCount >= 125)
      {
        isNextFunc(false);
      }
      getSearchResults();
    };

    useEffect( (value) =>{
      //fetchData();
      isNextFunc(true);
      fetchMoreData();
    },[]);

    return (
      <Grid className="grid-style" spacing={handleChange}>
        <header className="table-name"> Invoice Details</header>
        <Paper className={classes.paper} elevation={0} container>
          <PredictButton />
          <ViewButton />

          <AddButton />
          <EditButton />
          <DeleteButton />
          <TextField className={classes.search_bar}
            name="invoice_id"
            id="invoice_id"
            label="&nbsp;Search by Invoice Number" 
            variant="outlined"
            onChange={handleSearchValueChange}
          />
        </Paper>
        <Paper>
        <InfiniteScroll
          dataLength={dataRows.length} //length of our responseData
          next={fetchMoreData} //pass the function which will load more data
          hasMore={isNext} //whether to call next component while scrolling or not.
          loader={
            <div
              style={{ height: "80%", paddingLeft: "35%", overflow: "hidden" }}
            >
              <CircularProgress />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left"> <Checkbox color="Primary" onChange={handleSelection} id="head"/> </StyledTableCell>
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
          {dataRows.map((data, index) => (
            <StyledTableRow key={index} maxHeight="0 rem">
              <StyledTableCell component="th" scope="row"> <Checkbox color="Primary" onChange={handleSelection}/> </StyledTableCell>
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
    </InfiniteScroll>
        </Paper>
      </Grid>
    );
  };

  export default MainGrid;