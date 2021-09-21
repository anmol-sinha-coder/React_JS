import { DELETE } from "../reducers/constant";
import { DELETE_API } from "../reducers/constant";
import axios from "axios";
const intialState = {
  deleteData: [],
};
export default function fetch(state = [], action) {
  switch (action.type) {
    case DELETE:          
      // for (var i = 0; i < action.data.length; i++) {
      //   axios
      //     .get(
      //       `http://localhost:8080/1806020/deleteInvoice?doc_id=${action.data[i]}`
      //     )
      //     .then((data) => {
      //       console.log("successfull");
      //     })
      //     .catch((err) => console.log(err));        
      // }      
      return {
        ...state,
        deleteData: action.data,
      };    
      break;
    default:
      return state;
  }
}
