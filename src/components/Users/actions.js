// API
import UsersApi from './api'; 
//cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';
const GET_USER = "GET_USER";
const SET_LOGGIN_USER = "SET_LOGGIN_USER";
const ADD_NEW_USER = "ADD_NEW_USER";
const EDIT_USER = "EDIT_USER";
const GET_USER_PROFILE = "GET_USER_PROFILE";


export function getAllUsers(){
  
  return dispatch => {
    return {
      type: GET_ALL_USERS,
      payload: UsersApi.getUsersData()
    }
  };  
}
export function deleteUser(query){
	return{
		type:DELETE_USER,
		payload: UsersApi.deleteUserData(query)
	}
}
export function getUser(query){
	return {
		type: GET_USER,
		payload: UsersApi.getUserToLogin(query)
	}
}

export function setLoginError (){
  return{
    type:SET_LOGIN_ERROR,
    payload: "Datos suministrados incorrectos"
  }
}
export function setLogin(query,data){
  
	const service = UsersApi.setLogginUser(query,data);
	service.then(response => {

		if (response) {
			const dataUser = {
        userID: response.userID,
    		userName: data.userName, 
    		isLogged:true
    	};
    	const fecha = new Date();
			fecha.setMinutes(fecha.getMinutes() + 30);
    	cookies.set('isLogged',dataUser , { path: '/', expires:fecha });
		}
  });
	return {
		type: SET_LOGGIN_USER,
		payload: service
	}
	
}
export function AddUser(data){
	return {
		type:ADD_NEW_USER,
		payload: UsersApi.addNewUser(data)
	}
}
export function editUserData(query,data){
	return {
		type:EDIT_USER,
		payload: UsersApi.editUsers(query,data)
	}
}
export function getUserProfile(query){

	return {
		type: GET_USER_PROFILE,
		payload: UsersApi.getSingleUserProfile(query)
	}
}