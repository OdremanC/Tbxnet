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
  MENU:{
    GETMENU: '/menu',
    ADD: '/menu',
    DELETE: '/menu/',
    UPDATE: '/menu/'
   
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
