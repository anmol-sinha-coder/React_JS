import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  root: {   
    color: '#1a90ff',
    animationDuration: '1000ms',
    position: 'relative',
    margin : 'auto',  
  
  },
});

export default function Loader() {
  const classes = useStyles();

  return (
    <div >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.root}
      />
      
    </div>
  );
}
