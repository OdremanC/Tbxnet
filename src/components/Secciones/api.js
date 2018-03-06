// Constants
import { API } from '../../constants/api'; 

// Utils
import { apiFetch } from '../../lib/utils/api';


class SectionApi {
  static getMenuData() {
    const method = "GET";
    return apiFetch(API.SECCIONES.GETALLSECTIONS,{},'','',method);
  }
  static addNewData(data){
    const method = "POST";
    return apiFetch(API.SECCIONES.ADD,{},'',data,method);
  }
  static deleteMenuSection(query){
    const method = "DELETE";
    return apiFetch(API.SECCIONES.DELETE,{},query,'',method);
  }
  static editMenuSection(query,data){
    const method = "PUT";
    return apiFetch(API.SECCIONES.UPDATE,{},query,data,method);
  }
}
export default SectionApi;
