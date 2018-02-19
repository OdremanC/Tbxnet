//object freeze sirve para que el objeto no pueda ser cambiado
export const API = Object.freeze({
  USERS:{
    ALLUSERS: '/users',
    DELETE:  '/users/',
    SETLOGIN: '/users/',
    ADD: '/users',
    EDIT: '/users/',
    GETSINGLE: '/users/userName/'
  }
});
