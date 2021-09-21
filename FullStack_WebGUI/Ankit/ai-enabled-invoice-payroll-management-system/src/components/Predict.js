import React from 'react'
import Button from '@material-ui/core/Button';


function Predict() {
    return (
        <>
            <Button variant="contained" size="small" style={{
                    textTransform: 'none',
                    color:'white',
                    backgroundColor:'#97A1A9',
                    marginRight : '1vw'
                    }}>
                    Predict
               </Button> 
        </>
    )
}

export default Predict
