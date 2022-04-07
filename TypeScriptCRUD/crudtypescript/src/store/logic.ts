import { createLogic } from 'redux-logic'
import axios from 'axios'
import { ADD_USER_FAIL, ADD_USER_REQUEST, ADD_USER_SUCCESS } from './actions/actiontypes';


 const AddUserLogic = createLogic({
  type: ADD_USER_REQUEST, 
  cancelType: ADD_USER_FAIL, 
  latest: true, 

  processOptions: {
    dispatchReturn: true, 
    successType: ADD_USER_SUCCESS, 
    failType: ADD_USER_FAIL
  },

  
   process({ getState, action }) {
     console.log('add users', +action.type)
       axios.get('http://localhost:5000/user')
        .then((resp) => resp.data.user
       ).catch((err) => {
      console.log(err)
    })
     
  
  }
 });

 export default  AddUserLogic








