import React from 'react';
import Predict from './Predict'
import Correspondence from './Correspondence'
import Add from './Add';
import Edit from './Edit';
import Delete from '../containers/DeleteContainer';
import SearchBar from './Search_Bar'
import {  makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({

    left_portion : {
        flexGrow: 1,  
        paddingLeft: theme.spacing(2),  
        },
          right_portion : {             
            display: 'flex' ,
            flex: "1",
            
            alignItems : 'center',
            justifyContent : 'space-between'
          },        
        }));
function TableHeaderPortion({select, page,count}) {
    const classes = useStyles();
    return (
        <>
        <Grid container spacing={2}>
            <div className={classes.left_portion}>
                 <Predict className={classes.predict_portion}/>  
                 <Correspondence select = {select} page={page} count={count}/>                   
            </div>
            <div className={classes.right_portion} >
                 <Add select={select}/>      
                 <Edit select={select}/>
                 <Delete selected ={select}/>                         
                <SearchBar />    
            </div>
            </Grid>
        </>
    )
}

export default TableHeaderPortion
