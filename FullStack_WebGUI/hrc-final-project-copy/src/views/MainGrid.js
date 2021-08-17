  import React from 'react';
  import DataTable from "../utils/DataTable";
  import PredictButton from "../utils/PredictButton";
  import ViewButton from "../utils/ViewButton";
  import AddButton from "../utils/AddButton";
  import EditButton from "../utils/EditButton";
  import DeleteButton from "../utils/DeleteButton";
  import SearchText from "../utils/SearchText";
  import Grid from '@material-ui/core/Grid';
  import Paper from '@material-ui/core/Paper';
  import { makeStyles } from '@material-ui/core/styles';
  import axios from "axios";

  import wrong_symbol from '../assets/Path 18298.svg';  

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    paper: {
      padding: "1rem",
      backgroundColor: '#283a47',
    },

  }));
  
  const MainGrid = ({title}) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
  
    const handleChange = (event) => {
      setSpacing(Number(event.target.value));
    };
  
    const [editInvoicesOpen, setEditInvoicesOpen] = React.useState(false);
    const [addInvoicesOpen, setAddInvoicesOpen] = React.useState(false);
    const [deleteInvoicesOpen, setDeleteInvoicesOpen] = React.useState(false);
    const [rows,setRows] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [pageCount,setPageCount] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState("");
  
    const getSearchResults = (value) => {
      axios
        .get("http://localhost:8080/1805472/search", {
          params: {
            searchId : value
          }
        })
        .then((response) => {
          setRows([...response.data]);
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
          setRows([]);
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
  
    const handleEditOpen = () => {
      setEditInvoicesOpen(true);
    };
  
    const handleEditClose = () => {
      setEditInvoicesOpen(false);
    };
  
    const handleAddOpen = () => {
      setAddInvoicesOpen(true);
    };
  
    const handleAddClose = () => {
      setAddInvoicesOpen(false);
    };
  
    const handleDeleteOpen = () => {
      setDeleteInvoicesOpen(true);
    };
  
    const handleDeleteClose = () => {
      setDeleteInvoicesOpen(false);
    };
  
    const findIndex = ((val) => {
      for(let i=0;i<rows.length;i++)
        if(rows[i].doc_id == val)
          return rows[i];
    })

    return (
      <Grid className="grid-style" spacing={handleChange}>
        <header className="table-name"> Invoice Details</header>
        <Paper className={classes.paper} elevation={0} container>
          <PredictButton />
          <ViewButton />

          <AddButton />
          <EditButton />
          <DeleteButton />
          <SearchText/>
        </Paper>
        <Paper>
          <DataTable pageSize={5} checkboxSelection="True" />
        </Paper>
      </Grid>
    );
  };

  export default MainGrid;