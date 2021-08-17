import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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
      borderColor: '#97A1A9',
      height: '6vh',
      width: '15vw',
      padding:"1vh 1vw",
      margin:'0.5vw 0.25vh',
      color:'#97A1A9',
    },

  }));

var SearchText = () => {
    const classes = useStyles();

    //const [response, setResponse]=useState([]);
    const [rows, setRows] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    /*
    let change = event => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
*/
const getSearchResults = (value) => {
    axios
      .get("http://localhost:8000/1805553_HRC/SearchData", {
        params: {
          invoice_id : value
        }
      })
      .then((response) => {
        setRows([...response.data]);
      })
      .then((error) => {
        console.log("Error", error);
      });
  };

  const handleSearchValueChange = (event) => {
    const newSearchVal = event.target.value;
    setSearchValue(newSearchVal);
    if (newSearchVal === "")
      {
        console.log("here")
        setPageCount(1);
      }
    else {
      // clearTimeout(debounceTimer);
      // debounceTimer = setTimeout(() => {
        getSearchResults(newSearchVal);
      //}, 3000);
    }
  };

return(
    <>
    <TextField className={classes.search_bar}
     name="invoice_id"
     id="invoice_id"
     label="&nbsp;Search by Invoice Number" 
     variant="outlined"
     value={searchValue}
     onChange={event => handleSearchValueChange(event)}
    />
    </>
 );
};

export default SearchText;