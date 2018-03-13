// Utils
import { getNewState } from '../../lib/utils/frontend';
// Actions
import * as actions from './actions';

const initialState = {
  perfiles: [],
  alert:[],
  perfil: []
}

export default function perfileReducer(state = initialState, action){ 
  const dataPerfiles = Object.assign([], state.perfiles);

  switch(action.type){

    case "GET_ALL_PERFILES_SUCCESS":{
      const { payload: { response = [] }} = action;
      return getNewState(state, {
        perfiles: action.payload
      });
    }
    case "ADD_PERFIL_SUCCESS":{
      const { payload: { response = [] }} = action;
      const dataInsert = dataPerfiles.concat([action.payload.perfil]);
      return getNewState(state, {
        perfiles: dataInsert,
        alert: action.payload.mensaje
      });
    }
    case "ADD_PERFIL_ERROR":{
      const { payload: { response = [] }} = action;
      return getNewState(state, {
        alert: action.payload.mensaje
      });
    }
    case "DELETE_PERFIL_SUCCESS": {
      const { payload: { response = [] }} = action;
      var index = dataPerfiles.findIndex((perfil)=>{
        return perfil._id === action.payload.perfiles._id;
      });
      dataPerfiles.splice(index,1);
      return getNewState(state, {
        perfiles: dataPerfiles,
        alert: action.payload.mensaje
      });
    }
    case "GET_SINGLE_PERFIL_SUCCESS": {
      const { payload: { response = [] }} = action;
      return getNewState(state, {
        perfil: action.payload
      });
    }
    case "UPDATE_PERFIL_SUCCESS": {
      const { payload: { response = [] }} = action;
      var index = dataPerfiles.findIndex((perfil)=>{
        return perfil._id === action.payload.perfiles._id;
      });
      dataPerfiles[index] = action.payload.perfiles;
      return getNewState(state, {
        perfiles: dataPerfiles,
        alert: action.payload.mensaje
      });
    }
    case "RESET_ALERTS":{
      return getNewState(state, {
        alert: action.payload
      });
    }
    case "RESET_PERFIL":{
      return getNewState(state, {
        perfil: action.payload
      });
    }

      default:
        return state; 
    
    }
}
