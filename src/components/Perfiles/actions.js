// API
import PerfilApi from './api'; 
//cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const GET_ALL_PERFILES = 'GET_ALL_PERFILES';
const ADD_PERFIL = "ADD_PERFIL";
const DELETE_PERFIL = "DELETE_PERFIL";
const GET_SINGLE_PERFIL = "GET_SINGLE_PERFIL";
const UPDATE_PERFIL = "UPDATE_PERFIL";
const RESET_ALERTS = "RESET_ALERTS";
const RESET_PERFIL = "RESET_PERFIL";



export function getAllPerfiles(){
  
  return dispatch => {
    return {
      type: GET_ALL_PERFILES,
      payload: PerfilApi.getPerfilesData()
    }
  };  
}
export function addPerfil(data){
  return{
    type: ADD_PERFIL,
    payload: PerfilApi.addNewPerfil(data)
  }
}
export function deletePerfil(query){
  return{
    type: DELETE_PERFIL,
    payload: PerfilApi.deleteSomePerfil(query)
  }
}
export function getSingle(query){
  return{
    type:GET_SINGLE_PERFIL,
    payload: PerfilApi.getSinglePerfil(query)
  }
}
export function updatePerfil(query,data){
  const promise = PerfilApi.updateSomePerfil(query,data);
  return{
    type: UPDATE_PERFIL,
    payload: promise
  }
}
export function resetAlerts(){
  return{
    type: RESET_ALERTS,
    payload: []  
  }
}
export function resetPerfil(){
  return{
    type: RESET_PERFIL,
    payload: []  
  }
}