//Dependencias
import React, { Component } from 'react';

import PropTypes  from 'prop-types';
import '../css/users.css';

class Formulario extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password:'',
			editID:''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	static propTypes = {
		getDataFormChild: PropTypes.func,
		putCloseModal: PropTypes.func,
		dataToEdit: PropTypes.object,
		addOpen: PropTypes.bool

	}

	handleChange =(event) =>{

		switch(event.target.id){
			case "userName":
				this.setState({
					userName : event.target.value
				});
				break;
			case "email":
				this.setState({
					email : event.target.value
				});
				break;
			case "password":
				this.setState({
					password : event.target.value
				});
				break;
			case "firstName":
				this.setState({
					firstName : event.target.value
				});
				break;
			case "lastName":
				this.setState({
					lastName : event.target.value
				});
				break;	
		}
	}
	componentDidMount(){
		this.setState({
			firstName: this.props.dataToEdit.firstName,
			lastName: this.props.dataToEdit.lastName,
			userName: this.props.dataToEdit.userName,
			email: this.props.dataToEdit.email,
			password: this.props.dataToEdit.password,
			editID: this.props.dataToEdit._id
		});
	}


	render(){
		
		return(	
			<form className="form" >
			  <input type="hidden" id ="editID" value={this.state.editID} name="editID" />
			  <label htmlFor="firstName"> firstName:</label>
			  <input type="text" className="form-control " id="firstName" placeholder="firstName..." value={this.state.firstName}  onChange={this.handleChange} />
			  <label htmlFor="lastName"> lastName:</label>
			  <input type="text" className="form-control " id="lastName" placeholder="lastName..." value={this.state.lastName}  onChange={this.handleChange} />
			  <label htmlFor="UserName"> Usario:</label>
			  <input type="text" className="form-control " id="userName" placeholder="userName..." value={this.state.userName}  onChange={this.handleChange} />
			  <label htmlFor="apellido">Email:</label>
			  <input type="email" className="form-control" id="email" placeholder="Email..." value={this.state.email}  onChange={this.handleChange} />
			  <label htmlFor="pass">Password:</label>
			  <input type="password" className="form-control" id="password" placeholder="password..." value={this.state.password}  onChange={this.handleChange} />
			  <div className="row">
			  	<div className="col-md-6 ">
				  	<button className ="btn btn-success formButton" onClick={() => {this.props.passDataToParent(this.state)}}>Guardar</button>
					</div>
					<div className="col-md-6" >
						<button className ="btn btn-danger formButton" onClick={()=>this.props.putCloseModal(false)} >close</button>
					</div>
			  </div>
			</form>
		);
	}
}
export default Formulario;