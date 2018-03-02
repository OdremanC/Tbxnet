// Constants
import { API } from '../../../constants/api'; 

// Utils
import { apiFetch } from '../../../lib/utils/api';


class GlobalApi {
  static getSecciones(query) {
    const method = "GET";
    return apiFetch(API.GLOBAL.GETSECTIONS,{},query,'',method);
  }
}
export default GlobalApi;