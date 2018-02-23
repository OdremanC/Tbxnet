// Constants
import { API } from '../../constants/api'; 

// Utils
import { apiFetch } from '../../lib/utils/api';


class MenuApi {
  static getMenuData() {
    const method = "GET";
    return apiFetch(API.MENU.GETMENU,{},'','',method);
  }
  static addNewData(data){
    const method = "POST";
    return apiFetch(API.MENU.ADD,{},'',data,method);
  }
  static deleteMenuSection(query){
    const method = "DELETE";
    return apiFetch(API.MENU.DELETE,{},query,'',method);
  }
  static editMenuSection(query,data){
    const method = "PUT";
    return apiFetch(API.MENU.UPDATE,{},query,data,method);
  }
}
export default MenuApi;
