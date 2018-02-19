// Utils
import { getNewState } from '../../lib/utils/frontend';
// Actions
import * as actions from './actions';

const initialState = {
	users: [],
	singleUser: [],
	isLogged:false,
	errorLogin: '',
	errorSubmit:''
}

export default function usersData(state = initialState, action){
	const dataUsers = Object.assign([], state.users);

	switch(action.type){

		case "GET_ALL_USERS_SUCCESS":{
			const { payload: { response = [] }} = action;
	    return getNewState(state, {
	    	users: action.payload
	    });
		}
		case "DELETE_USER_SUCCESS":{
			const { payload: { response = [] }} = action;
			var index = editUser.findIndex((users)=>{
		    return users._id === action.payload.users._id;
		  });
		  editUser.splice(index,1);
			return getNewState(state, {
				users: editUser
			});
		}
		case 'GET_USER_SUCCESS': { 
	    const { payload: { response = [] }} = action;
	    return getNewState(state, {
	        singleUser: action.payload
	      });
	    }
	    case "SET_LOGGIN_USER_SUCCESS":{
			const { payload: { response = [] }} = action;
			return getNewState(state, {
				isLogged:action.payload.isLogged
			});
		}
		case "ADD_NEW_USER_SUCCESS":{
			const { payload: { response = [] }} = action;
			const dataInsert = dataUsers.concat([action.payload]);  
			return getNewState(state, {
				users: dataInsert
			});
		}
		case "EDIT_USER_SUCCESS":{
			const { payload: {response = [] }} = action;
			var index = dataUsers.findIndex((users)=>{
		    return users._id === action.payload._id;
		  });
		  dataUsers[index] = action.payload;
		  return getNewState(state, {
		    	users: dataUsers
		  });
		}
		case "GET_USER_PROFILE_SUCCESS": {
			const { payload: {response = [] }} = action;
		 	return getNewState(state, {
	    	singleUser: action.payload
	    });
		}
		case "SET_LOGGIN_USER_ERROR": {
			return getNewState(state, {
				errorLogin: "Los datos no son correctos"
			});
		}
    	default:
      	return state;	
		}
}
