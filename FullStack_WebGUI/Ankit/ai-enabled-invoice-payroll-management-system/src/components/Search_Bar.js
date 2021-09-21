import React, { useState, useEffect} from 'react';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";

const SEARCH_API = "http://localhost:8080/1806020/searchInvoice"

function Search_Bar() {
  const classes = useStyles();
  const [get, setGet] = useState('');
  const [search, setSearch] = useState('');
  const [filteredStates, setFilteredStates] = useState(get);

  fetch('https://api.github.com/users/hacktivist123/repos')
  .then(response => response.json())
  .then(data =>setGet(data))

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(get);
  //     const filter = get.filter(get => {
  //       return get.name.toLowerCase().includes(search.toLowerCase());
  //     });
  //     setFilteredStates(filter);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [search]);


  
  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon fontSize="small" float="right" />
        </div>
        <InputBase
          style={{
            textTransform: "none",
          }}
          
          
          placeholder="Search by invoice number"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ style: { fontFamily: "nunito", color: "white" } }}
        />
    
      </div>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    backgroundColor: fade("#283A46", 1),
    marginLeft: 0,
    borderRadius: "8px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    color: "#97A1A9",
    alignItems: "center",
    justifyContent: "end",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    "&:focus": {
      border: "1px solid #14AFF1",
    },
    border: "1px solid #2E4B5C",
    borderRadius: "8px",
    padding: theme.spacing(1, 0, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#97A1A9",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {},
    },
  },
}));


export default Search_Bar;


