import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from '../src/utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);
console.warn("store data",store);



ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <App />
      </Provider>
    </MuiThemeProvider>,
  document.getElementById('root')
);
/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)
 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );
*/
serviceWorker.unregister();


