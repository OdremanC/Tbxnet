// Dependencies
import React, { Component } from 'react';
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
//Manejo de props
import PropTypes  from 'prop-types';
//conexion a redux
import { connect } from 'react-redux';
import { getValueLogin, getUserNameLogin } from '../Global/Functions/';

import  Modal from '../Global/ModalComponent/Modal';
import ProfilePage from './Formularios/formProfilePage';
//import Table from './tableComponents/TableGenerator';
//import Formulario from './Formularios/formStock';
import * as actions from './actions';

class Usuario extends Component{
	constructor(props){
		super(props);
	}
	static proptypes = {

	}
	componentWillMount(){
		if (getValueLogin() !== true) {
        	this.props.history.push('/login');
    }
		const query = getUserNameLogin();
		this.props.getUserProfile(query);
	}

  getDataFormChild = (dataForm) => {

    const query = dataForm.idEdit;
    
    if(!dataForm.password){
      dataForm.password = dataForm.dataBasePassword;
    }
    
    const data = {
      firstName: dataForm.firstName,
      lastName: dataForm.lastName,
      userName: dataForm.userName,
      email: dataForm.email,
      password: dataForm.password
    };
    
    this.props.editUserData(query,data);
  }

	render(){
		
		return(
			<div className="usuario">
				<ProfilePage
					dataProfile = {this.props.DataUsers}
          passDataToParent = {this.getDataFormChild}
				>
				</ProfilePage>
				
			</div>
		);
	}
}
export default connect(state=>({
	DataUsers: state.usersData.singleUser
}),actions)( Usuario);