// Constants
import { API } from '../../constants/api'; 

// Utils
import { apiFetch } from '../../lib/utils/api';


class PerfilApi {
  static getPerfilesData() {
    const method = "GET";
    return apiFetch(API.PERFILES.ALLPERFILES,{},'','',method);
  }
  static addNewPerfil(data){
    const method = "POST";
    return apiFetch(API.PERFILES.ADD,{},'',data,method);
  }
  static deleteSomePerfil (query){
    const method = "DELETE";
    return apiFetch(API.PERFILES.DELETE,{},query, '',method);
  }
  static getSinglePerfil(query){
    const method = "GET";
    return apiFetch(API.PERFILES.GETSINGLE,{},query,'',method);
  }
  static updateSomePerfil(query,data){
    const method = "PUT";
    return apiFetch(API.PERFILES.UPDATE,{},query,data,method);
  }
}
export default PerfilApi;
