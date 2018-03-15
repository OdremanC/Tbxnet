// Dependencies
import queryString from 'query-string';
// Config
import config from '../../config';
import { getUserJwt } from '../../components/Global/Functions/';

//funcion que realiza el fetch al servicio a consumir
export function apiFetch(endpoint, options = {}, query, data,method) {

  const token = getUserJwt();
  if (token) {
    options ={"token":token};
  }

  const getPromise = async () => {
    
    try {
      const fetchOptions = apiOptions(options,data,method);
      const fetchEndpoint = apiEndpoint(endpoint, query);
      const response = await fetch(fetchEndpoint, fetchOptions);
      const json =  await response.json();
    
      return json;

    } catch (e) {

      throw e;
    }
  };
  
   return getPromise();
    
}

//configuracion del endpoint del servicio a consumir
export function apiEndpoint(endpoint, query) {
  

  return `${config.api.url}${endpoint}${query}`;
}

//configuracion de los headers 
export function apiOptions(options = {} , data = '', method ='') {

  //const method = method != '' ? 'POST' : 'GET';
  var headers = { 'Content-Type':'application/json','Authorization':options.token};
  
  let newOptions = {
    method,
    headers
  };

  if (data !== '') {
    newOptions.body = JSON.stringify(data);
  }

  return newOptions;
}
 