//Dependencias
import React, { Component } from 'react';

import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { getValueLogin, getUserNameLogin } from '../../Global/Functions/';
import '../css/users.css';
import * as actions from '../actions';


class ProfilePage extends Component{
	constructor(props){
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			dataBasePassword:'',
			idEdit: '',
			errorPass:''
		};
	}

	static propTypes = {
		dataProfile: PropTypes.array
	}

	componentDidMount(){
		const query = getUserNameLogin();
		this.props.getUserProfile(query);
		if (this.props.dataProfile[0] !== undefined) {
			this.setState({
				firstName: this.props.dataProfile[0].firstName,
				lastName: this.props.dataProfile[0].lastName,
				userName: this.props.dataProfile[0].userName,
				email: this.props.dataProfile[0].email,
				dataBasePassword: this.props.dataProfile[0].password,
				idEdit: this.props.dataProfile[0].idEdit
			});
		}		
	}

	componentWillReceiveProps(nextProps){	
		if (JSON.stringify(this.props.dataProfile[0]) !== JSON.stringify(nextProps.dataProfile[0])) {
			this.updateStateValues(nextProps.dataProfile[0]);
		}
	}

	updateStateValues = (values) =>{
		this.setState({
			firstName: values.firstName,
			lastName: values.lastName,
			userName: values.userName,
			email: values.email,
			dataBasePassword: values.password,
			idEdit: values._id
		});
	}

	handleChange = (event) =>{
		
		switch(event.target.id){
			case 'first_name':
				this.setState({
					firstName : event.target.value
				});
				break;
			case 'last_name':
				this.setState({
					lastName : event.target.value
				});
				break;
			case 'userName':
				this.setState({
					userName : event.target.value
				});
				break;
			case 'password':
				this.setState({
					password : event.target.value
				});
				break;
			case 'password_confirmation':
				this.setState({
					passwordConfirm : event.target.value,
				});
				break;
		}
	}

	render(){
		
		const { password, passwordConfirm } = this.state;
		return(
			<div className="col-md-12">
		    	<form role="form">
		    		<input type="hidden" value={this.state.idEdit} id="isEdit" />
					<h2>Edit your profile.<small>It's always easy</small></h2>
					<hr className="colorgraph" />
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-md-6">
							<div className="form-group">
								<label htmlFor="firstName"> First Name:</label>
		              <input type="text" name="first_name" id="first_name" value={this.state.firstName} onChange={this.handleChange} className="form-control input-lg"  tabIndex="1" />
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-md-6">
							<div className="form-group">
							<label htmlFor="lastName"> Last Name:</label>
								<input type="text" name="last_name" id="last_name" value={this.state.lastName} onChange={this.handleChange} className="form-control input-lg" tabIndex="2" />
							</div>
						</div>
					</div>
					<div className="row">
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<label htmlFor="UserName">UserName:</label>
							<input type="text" name="userName" id="userName" value={this.state.userName} onChange={this.handleChange} className="form-control input-lg" tabIndex="2" />
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6">
						<div className="form-group">
							<label htmlFor="email"> Email:</label>
							<input type="email" name="email" value={this.state.email} id="email" onChange={this.handleChange} className="form-control input-lg" tabIndex="4" />
						</div>
					</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-md-6">
							<div className="form-group">
								<label htmlFor="password">Password:</label>
								<input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} className="form-control input-lg" placeholder="Password" tabIndex="5" />
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 col-md-6">
							<div className="form-group">
							<label htmlFor="UserName">Password Confirm:</label>
								<input type="password" name="password_confirmation" id="password_confirmation" onChange={this.handleChange} className="form-control input-lg" placeholder="Confirm Password" tabIndex="6" />
								<p id="errorData">{
					    			password != passwordConfirm ? "the Password Not Match" : ''
					    		}</p>
							</div>
						</div>
					</div>
					<hr className="colorgraph" />
					<div className="row">
						<div className="col-xs-12 col-md-6"></div>
						<div className="col-xs-12 col-md-6">
							<button type="button" className ="btn btn-success formButton" onClick={() => {this.props.passDataToParent(this.state)}}>Guardar</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
export default connect (state => ({
	routes: state.router,
	dataProfile: state.usersData.singleUser
}),actions)(ProfilePage);