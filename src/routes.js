// Dependencies
import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
//Manejo de props
import PropTypes  from 'prop-types';
//conexion a redux
import { connect } from 'react-redux';

// Components
import App from './components/App';
import Home from './components/Home';
import Users from './components/Users';
import Login from './components/Login';
import Page404 from './components/Page404';
import Usuario from './components/Users/user';
import AddUser from './components/Users/formUsers'
import Secciones from './components/Secciones';
import Config from './components/Config';
import Perfiles from './components/Perfiles';
import addPerfiles  from './components/Perfiles/FormAddPerfil';
import * as actions from './components/Users/actions';
import requiresAuth from './components/Global/WithValidation';


import { getValueLogin, getUserNameLogin, getPerfil,checkPermission } from './components/Global/Functions/';



//CONFIGIRACION DE RUTAS DE LA APLICACION

const AppRoutes = () =>
  
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Users" component={Users} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/User" component={Usuario} />
      <Route exact path="/addUser" component={AddUser} />
      <Route exact path="/addUser/:id" component={AddUser} />
      <Route exact path="/Config" component={Config} />
      <Route exact path="/Secciones" component={Secciones} />
      <Route exact path="/Perfiles" component={Perfiles} />
      <Route exact path="/addPerfil" component={addPerfiles} />
      <Route exact path="/addPerfil/:id" component={addPerfiles} />

      <Route component={Page404} />
    </Switch>
  </App>;


export default AppRoutes;

