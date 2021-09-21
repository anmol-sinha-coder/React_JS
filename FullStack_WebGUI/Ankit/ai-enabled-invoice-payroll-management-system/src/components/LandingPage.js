import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import HeaderSection from "./HeaderSection";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Container from "@material-ui/core/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import TableHeaderPortion from "./TableHeaderPortion";
import { Grid } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Customer Name" },
  {
    id: "Customer #",
    numeric: true,
    disablePadding: true,
    label: "Customer #",
  },
  { id: "Invoice #", numeric: true, disablePadding: false, label: "Invoice #" },
  {
    id: "Invoice Amount",
    numeric: true,
    disablePadding: true,
    label: "Invoice Amount",
  },
  { id: "Due Date", numeric: true, disablePadding: false, label: "Due Date" },
  { id: "Delay", numeric: true, disablePadding: false, label: "Delay" },
  {
    id: "Predicted Aging Date",
    numeric: true,
    disablePadding: false,
    label: "Predicted Aging Date",
  },
  { id: "Notes", numeric: true, disablePadding: false, label: "Notes" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow >
        <TableCell
          padding="checkbox"
          style={{ border: "none", background: "#2E4350" }}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            size="small"
            style={
              numSelected > 0 ? { color: "#14AFF1" } : { color: "#73818A" }
            }
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            style={{ border: "none", background: "#2E4350" }}
            key={index}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={UnfoldMoreIcon}
              style={{ color: "#97A1A9", fontSize: "0.9em" }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: "#3A4A5F",
    
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 700,
   
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const head = useToolbarStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const count = 15;

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `http://localhost:8080/1806020/get_invoice?start=${page}&limit=${count}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData((prev) => [...prev, ...data]);
          setHasMore(true);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [page, count]);

  const fetchNext = () => {
    setPage(page + 15);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.doc_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    props.deleteHandler(newSelected);

  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <HeaderSection />
      <Container maxWidth="lg">
        <Paper
          className={classes.paper}
          container
          style={{ backgroundColor: "#2E4351" }}
        >
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <Toolbar className={clsx(head.root)}>
            <TableHeaderPortion select={selected} page={page} count={count}/>
          </Toolbar>
          <div id="scrollableDiv" style={{ height: 400, overflow: "auto" }}>
            <InfiniteScroll
              dataLength={data.length}
              next={fetchNext}
              hasMore={hasMore}
              loader={
                <h1 style={{ textAlign: "center" }}>
                  <Loader />
                </h1>
              }
              scrollableTarget="scrollableDiv"
            >
              <TableContainer  className={classes.container} component={Paper}>
                <Table
                  
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                  style={{position: 'fixed'}}
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                  />
                  <TableBody>
                    {data?.map((row, index) => {
                      const isItemSelected = isSelected(row.doc_id);
                      const labelId = `enhanced-table-checkbox-${row.doc_id}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.doc_id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                          style={
                            isItemSelected
                              ? { background: "#2A5368" }
                              : index % 2
                              ? { background: "#283A46" }
                              : { background: "#2F4451" }
                          }
                        >
                          <TableCell
                            padding="checkbox"
                            style={{ border: "none" }}
                          >
                            <Checkbox
                              style={
                                isItemSelected > 0
                                  ? { color: "#14AFF1" }
                                  : { color: "#73818A" }
                              }
                              checked={isItemSelected}
                              size="small"
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                          >
                            {row.name_customer}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            {row.cust_number}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            {row.doc_id}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            {" "}
                            {(row.total_open_amount / 1000).toFixed(2)}K
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            {row.due_in_date}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            -
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="right"
                          >
                            -
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#EBEDEE",
                              border: "none",
                              fontSize: "0.78em",
                            }}
                            align="left"
                          >
                            {/* <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem'}}> 
                            <Typography nowrap >
                              areallyrea
                            </Typography>
                          </div> */}
                            -
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </InfiniteScroll>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
