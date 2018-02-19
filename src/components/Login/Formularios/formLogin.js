// Dependencies
import React, { Component } from 'react';
//Manejo de props
import PropTypes  from 'prop-types';
import '../css/login.css';

class FormLogin extends Component{
	constructor(props){
		super(props);
		this.state = {
			usuario:'',
			password:'',
		};
	}

	static propTypes = {
		getDataFrom: PropTypes.func
	}

	handleChange = (event) => {

		switch(event.target.id){
			case "usuario":
				this.setState({
					usuario: event.target.value
				});
				break;
			case "password":
				this.setState({
					password: event.target.value
				});
				break;
		}
	}

	render(){
		
		return(
			<div className="container">
				<div className="row">
					<form className="formLogin">
					  <div className="container">
					   <p id="errorData">{
					    	this.props.errorData && this.props.errorData 
					    }</p>
					    <label><b>Username</b></label>
					    <input className="loginIn" type="text" placeholder="Enter Username" value={this.state.usuario} name="usuario" id="usuario" onChange={this.handleChange} required />					   
					    <label><b>Password</b></label>
					    <input className="loginIn" type="password" placeholder="Enter Password" id="password" value={this.state.password} name="pass" onChange={this.handleChange} required />
					    <button className="logbutton" type="button" onClick={()=>{this.props.getDataFrom(this.state)}}>Login</button>
					  </div>
					</form>
				</div>
			</div>
		);
	}
}
export default FormLogin;