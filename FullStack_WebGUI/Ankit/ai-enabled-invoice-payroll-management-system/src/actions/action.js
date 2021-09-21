import {DELETE} from '../reducers/constant';
export const deleteBtn = (data) => {    
    return {
        type : DELETE,
        data : data,        
    }
}

export const Add = (data) => {
    return {
        type : 'ADD',
        data : data
    }
}