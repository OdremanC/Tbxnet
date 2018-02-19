// Dependencies
import React, { Component } from 'react';
//LINK sirve para crear enlaces
import { Link,withRouter } from 'react-router-dom'; 
//Manejo de props
import { PropTypes,instanceOf}  from 'prop-types';
//conexion a redux
import { connect } from 'react-redux';
import { getValueLogin } from '../Global/Functions/';
//form
import FormLogin from './Formularios/formLogin';

import * as actions from '../Users/actions';


class Login extends Component{
	constructor(props){
		super(props);

		this.state = {
			usuario: '',
			isLogged: false,
			error:''
		}	
	}

	static propTypes = {
		getAllUsers: PropTypes.func,
		setLogin: PropTypes.func	
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isLogged){
			this.props.history.push('/');
		}
	}

	getDataFromForm = (formValues) => {
  	const query = formValues.usuario;
    const data = {
    	userName:formValues.usuario,
    	password: formValues.password
    };
  	this.props.setLogin(query,data);
	}
	
	render(){	
		const { isLogged,loginError } = this.props;
		return(
			<div className="loginPage">
				<FormLogin 
					getDataFrom ={this.getDataFromForm}
					errorData={loginError}
				>
				</FormLogin>
			</div>
		);
	}
}
export default withRouter(connect(state=>({
	routes: state.router,
	isLogged: state.usersData.isLogged,
  loginError: state.usersData.errorLogin
}),actions)(Login));