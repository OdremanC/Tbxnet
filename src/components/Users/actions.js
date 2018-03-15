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
const GET_PROFILES = "GET_PROFILES";
const RESET_SINGLE_USER_STATE = "RESET_SINGLE_USER_STATE";
const GET_USER_LOGIN_PERFIL = "GET_USER_LOGIN_PERFIL";
const RESET_ALERTS = "RESET_ALERTS";

export function getAllUsers(token){
  return {
    type: GET_ALL_USERS,
    payload: UsersApi.getUsersData(token)
  }
}
export function deleteUser(query){
	return{
		type:DELETE_USER,
		payload: UsersApi.deleteUserData(query)
	}
}
export function getUser(query,token){
	return {
		type: GET_USER,
		payload: UsersApi.getUserToLogin(query,token)
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
        userPerfil: response.userProfile, 
    		isLogged:true,
        token: response.token
    	};
       
    	const fecha = new Date();
			fecha.setMinutes(fecha.getMinutes() + 60);
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
export function getProfiles(){
  return{
    type: GET_PROFILES,
    payload: UsersApi.getAllProfiles()
  }
}
export function resetSingleUserState(){
  return{
    type: RESET_SINGLE_USER_STATE,
    payload: []
  }
}
export function getUserLogingPerfil(query){
  return{
    type: GET_USER_LOGIN_PERFIL,
    payload: UsersApi.getPerfilLogin(query)
  }
}
export function resetAlerts(){
  return{
    type: RESET_ALERTS,
    payload: []  
  }
}