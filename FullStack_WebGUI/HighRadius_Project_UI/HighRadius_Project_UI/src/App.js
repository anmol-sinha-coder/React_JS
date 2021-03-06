import React, { Component } from 'react';
import './App.css';
import { withStyles} from '@material-ui/core/styles';
import CollectorDashboard from '../src/views/CollectorDashboard';
import CustomerDetails from '../src/views/CustomerDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ROLL_NUMBER} from '../src/utils/constants';
import { Provider } from 'react-redux';
import store from './reducers/store';

const styles = (theme) => ({
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
});
class App extends Component {
  render() {
    const { classes} = this.props;
    return (
      <Provider store={store}>
        <div className={classes.mainBackground}>
          <Router basename={ROLL_NUMBER}>
            <Switch>
              <Route exact path="/" component={CollectorDashboard} />
              <Route path="/customer-dashboard" component={CustomerDetails} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
