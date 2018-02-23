// API
import MenuApi from './api'; 
//cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const GET_ALL_MENU = 'GET_ALL_MENU';
const ADD_NEW_SECTION = "ADD_NEW_SECTION";
const DELETE_SECTION = "DELETE_SECTION";
const EDIT_SECTION = "EDIT_SECTION";


export function getAllMenu(){
  return {
    type: GET_ALL_MENU,
    payload: MenuApi.getMenuData()
  }
}
export function addMenu(data){
  return{
    type: ADD_NEW_SECTION,
    payload: MenuApi.addNewData(data)
  }
}
export function deleteSection(query){
  return{
    type:DELETE_SECTION,
    payload: MenuApi.deleteMenuSection(query)
  }
}
export function editSection(query,data){
  return{
    type:EDIT_SECTION,
    payload: MenuApi.editMenuSection(query,data)
  }
}