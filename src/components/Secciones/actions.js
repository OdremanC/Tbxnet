// API
import SectionApi from './api'; 
//cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const GET_ALL_SECTIONS = 'GET_ALL_SECTIONS';
const ADD_NEW_SECTION = "ADD_NEW_SECTION";
const DELETE_SECTION = "DELETE_SECTION";
const EDIT_SECTION = "EDIT_SECTION";


export function getAllMenu(){
  return {
    type: GET_ALL_SECTIONS,
    payload: SectionApi.getMenuData()
  }
}
export function addMenu(data){
  return{
    type: ADD_NEW_SECTION,
    payload: SectionApi.addNewData(data)
  }
}
export function deleteSection(query){
  return{
    type:DELETE_SECTION,
    payload: SectionApi.deleteMenuSection(query)
  }
}
export function editSection(query,data){
  return{
    type:EDIT_SECTION,
    payload: SectionApi.editMenuSection(query,data)
  }
}
