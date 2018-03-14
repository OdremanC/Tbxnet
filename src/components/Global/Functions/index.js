//cookies
import Cookies from 'universal-cookie';
import GlobalApi from './api';
const cookies = new Cookies();

export function getValueLogin (){
    if (cookies.get('isLogged')) {
        if (cookies.get('isLogged').isLogged) {
            return true;
        }else{
          return false;
        }
    }
}

export function getUserNameLogin (){
    if (cookies.get('isLogged')) {
        if (cookies.get('isLogged').isLogged) {
            return cookies.get('isLogged').userName;
        }else{
          return false;
        }
    }
}
export function getUserIdFromCookie (){
    if (cookies.get('isLogged')) {
        if (cookies.get('isLogged').isLogged) {
            return cookies.get('isLogged').userID;
        }else{
          return false;
        }
    }
}

export function getPerfil (){
    if (cookies.get('isLogged')) {
        if (cookies.get('isLogged').userPerfil) {
            return cookies.get('isLogged').userPerfil;
        }else{
          return false;
        }
    }
}
export function getUserJwt (){
    if (cookies.get('isLogged')) {
        if (cookies.get('isLogged').token) {
            return cookies.get('isLogged').token;
        }else{
          return false;
        }
    }
}

