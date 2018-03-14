// Utils 
import { getNewState } from '../../lib/utils/frontend';
// Actions
import * as actions from './actions';

const initialState = {
  secciones: [],
  alert:[]
}

export default function sectionsReducer(state = initialState, action){
  const dataToChange = Object.assign([], state.secciones);

  switch(action.type){

    case "GET_ALL_SECTIONS_SUCCESS":{
      const { payload: { response = [] }} = action;

      return getNewState(state, {
        secciones: action.payload
      });
    }
    case "ADD_NEW_SECTION_SUCCESS":{
      const { payload: { response = [] }} = action;
      const dataInsert = dataToChange.concat([action.payload.secciones]); 
      
      return getNewState(state, {
        secciones: dataInsert,
        alert: action.payload.mensaje
      });
    }
    case "DELETE_SECTION_SUCCESS":{
      const { payload: { response = [] }} = action;
      var index = dataToChange.findIndex((secciones)=>{
        return secciones._id === action.payload.secciones._id;
      });
      dataToChange.splice(index,1);
      return getNewState(state, {
        secciones: dataToChange,
        alert: action.payload.mensaje
      });
    }
    case "EDIT_SECTION_SUCCESS":{
      const { payload: {response = [] }} = action;
      var index = dataToChange.findIndex((menu)=>{
        return menu._id === action.payload.secciones._id;
      });
      dataToChange[index] = action.payload.secciones;
      return getNewState(state, {
        secciones: dataToChange,
        alert: action.payload.mensaje
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
