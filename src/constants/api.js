//object freeze sirve para que el objeto no pueda ser cambiado
export const API = Object.freeze({
  USERS:{
    ALLUSERS: '/users',
    DELETE:  '/users/',
    SETLOGIN: '/users/',
    ADD: '/users',
    EDIT: '/users/',
    GETSINGLE: '/users/userName/',
    GETPROFILES: '/perfiles',
    PERFIL: '/perfiles/'
  },
  SECCIONES:{
    GETALLSECTIONS: '/secciones',
    ADD: '/secciones',
    DELETE: '/secciones/',
    UPDATE: '/secciones/'
   
  },
  PERFILES:{
    ALLPERFILES: '/perfiles',
    ADD: '/perfiles',
    DELETE: '/perfiles/',
    GETSINGLE: '/perfiles/',
    UPDATE: '/perfiles/'
  },
  GLOBAL:{
    GETSECTIONS: '/perfiles/'
  }
});
