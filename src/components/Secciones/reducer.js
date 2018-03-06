// Utils 
import { getNewState } from '../../lib/utils/frontend';
// Actions
import * as actions from './actions';

const initialState = {
  secciones: []
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
      const dataInsert = dataToChange.concat([action.payload]); 
      return getNewState(state, {
        secciones: dataInsert
      });
    }
    case "DELETE_SECTION_SUCCESS":{
      const { payload: { response = [] }} = action;
      var index = dataToChange.findIndex((menu)=>{
        return menu._id === action.payload.menu._id;
      });
      dataToChange.splice(index,1);
      return getNewState(state, {
        secciones: dataToChange
      });
    }
    case "EDIT_SECTION_SUCCESS":{
      const { payload: {response = [] }} = action;
      var index = dataToChange.findIndex((menu)=>{
        return menu._id === action.payload._id;
      });
      dataToChange[index] = action.payload;
      return getNewState(state, {
          secciones: dataToChange
      });
    }
    
    default:
        return state; 
    }
}
