import React from 'react';
import './App.css';
import theme from '../src/utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import MainGrid from './views/MainGrid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROLL_NUMBER } from './utils/constants';

import logo from './assets/logo.gif';
import emblem from './assets/reactjs.gif';

/*
const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    background: theme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));
*/

const App = () => {
  /*
  console.log('theme', theme);
  const classes = useStyles();
  return (
    <div className={classes.mainBackground}>
      <Router basename={`/${ROLL_NUMBER}`}>
        <Route exact path="/" component={CollectorDashboard} />
      </Router>
    </div>
  );
  */

  return (
    <>
      {/* React Fragment Also known as Tshirt Syntax => <></> ==> Since React only Allows you to return HTML
      Element encapsulated in a single tag like <div></div> */}
      <div className="App">
        <header className="App-header">
        <p>
         <img src={emblem} className="App-logo1" alt="emblem"/>
         <img src={logo} className="App-logo2" alt="logo"/> 
        </p>
        </header>
      </div>

      <div>
        <MainGrid title="Payroll Prediction"/>
      </div>
    </>
  );
};

export default App;
