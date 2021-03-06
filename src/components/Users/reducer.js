// Utils
import { getNewState } from '../../lib/utils/frontend';
// Actions
import * as actions from './actions';

const initialState = {
	users: [],
	singleUser: [],
	isLogged:false,
	errorLogin: '',
	errorSubmit:'',
	allProfiles: [],
	perfilLog:[],
	alert:[]
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
			var index = dataUsers.findIndex((users)=>{
		    return users._id === action.payload.users._id;
		  });
		  dataUsers.splice(index,1);
			return getNewState(state, {
				users: dataUsers,
				alert: action.payload.mensaje
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
			const dataInsert = dataUsers.concat([action.payload.users]);

			return getNewState(state, {
				users: dataInsert,
				alert: action.payload.mensaje
			});
		}
		case "EDIT_USER_SUCCESS":{
			const { payload: {response = [] }} = action;
			var index = dataUsers.findIndex((users)=>{
		    return users._id === action.payload.users._id;
		  });
		  dataUsers[index] = action.payload;
		  return getNewState(state, {
		    	users: dataUsers,
		    	alert: action.payload.mensaje
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
		case "GET_PROFILES_SUCCESS": {
			const { payload: {response = [] }} = action;
			return getNewState(state, {
				allProfiles: action.payload
			});
		}
		case "RESET_SINGLE_USER_STATE": {
			return getNewState(state, {
				singleUser: action.payload
			});
		}
		case "GET_USER_LOGIN_PERFIL_SUCCESS":{
      const { payload: { response = [] }} = action;
      
      return getNewState(state, {
        perfilLog: action.payload
      });
    }

    case "RESET_ALERTS":{
      return getNewState(state, {
        alert: action.payload
      });
    }

    	default:
      	return state;	
		}
}
