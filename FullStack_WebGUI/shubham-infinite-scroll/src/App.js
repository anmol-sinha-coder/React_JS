import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { CircularProgress, TableContainer, Table, TableBody, TableCell, TableRow, Paper } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from "react-infinite-scroll-component";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#222333',
    color: 'azure',
  },
  body: {
    fontSize: 14,
    backgroundColor: '#222333',
    color: 'azure',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#283a46', //theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
      backgroundColor: '', //theme.palette.action.hover,
    },
  },
}))(TableRow);

const json_size=30;

function App() {
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const fetchData = () => {
    axios.get(
      `https://picsum.photos/v2/list?page=${pageCount}&limit=${json_size/10}`
      )
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let fetchMoreData = () => {
    setCount(pageCount + 1);
    if(pageCount >= 10)
    {
      isNextFunc(false);
    }
    fetchData();
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async function timeSensativeAction(){
    fetchMoreData();
    await sleep(10000);
  }

  useEffect( () =>{
    isNextFunc(true);
    timeSensativeAction();
  },[]);

  console.log("h2h",responseData.length);
  console.log("h2h1",isNext);
  console.log("h2h2",pageCount);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetching Image Data</h1>
      </header>
      <InfiniteScroll
        dataLength={responseData.length}
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div style={{ height: "40%", paddingLeft: "5%", overflow: "hidden" }}>
            Loading More data, Please Wait
            <CircularProgress />
          </div>
        }>
      <>
      <TableContainer component={Paper}>
        <Table aria-label="simple-table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell >
          {responseData.map((data, index) => (
            <div key={index.toString()} style={{ height: "40%", width: "40%" }}>
              <li>{index}</li>
                <img height="50%" width="50%" src={data.download_url} alt={"No img found"} />
              {data.author}
          </div>
          ))};
          </StyledTableCell>
         </StyledTableRow>
      </TableBody>
      </Table>
      </TableContainer>
      </>
    </InfiniteScroll>
    </div>
  );
}

export default App;