//Dependencias
import React, { Component } from 'react';
import { Panel,FormGroup,FormControl,ControlLabel,HelpBlock } from 'react-bootstrap'
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { getValueLogin } from '../Global/Functions/';
import './users.css';
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import * as actions from './actions';
import Alerts from '../Global/alerts';

class Formulario extends Component{
	
	constructor(props,context){
		super(props,context);

		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password:'',
			editID:'',
			perfil:'',
			userProfile:[],
			valor: undefined
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	static propTypes = {
		getDataFormChild: PropTypes.func,
		putCloseModal: PropTypes.func,
		dataToEdit: PropTypes.object,
		addOpen: PropTypes.bool

	}
	componentWillMount(){
		if (getValueLogin() !== true) {
     	this.props.history.push('/login');
    }
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
			case "perfiles":
				this.setState({perfil: event.target.value});
				break
		}
	}
	componentWillReceiveProps(nextProps){
		
		if (nextProps.dataToEdit !== undefined) {

			this.setState({
				firstName: nextProps.dataToEdit.firstName,
				lastName: nextProps.dataToEdit.lastName,
				userName: nextProps.dataToEdit.userName,
				email: nextProps.dataToEdit.email,
				password: nextProps.dataToEdit.password,
				editID: nextProps.dataToEdit._id,
				perfil: nextProps.dataToEdit.perfil
			});
		}		
	}

	componentDidMount(){
		this.props.getProfiles();
		if (this.props.match.params.id !== undefined) {
			const query = this.props.match.params.id;
			this.props.getUser(query);
		}

		if (this.props.dataToEdit) {
			this.setState({
				firstName: this.props.dataToEdit.firstName,
				lastName: this.props.dataToEdit.lastName,
				userName: this.props.dataToEdit.userName,
				email: this.props.dataToEdit.email,
				password: this.props.dataToEdit.password,
				editID: this.props.dataToEdit._id,
				perfil: this.props.dataToEdit.perfil
			});
		}		
	}
	cancelar = () =>{
		this.setState({
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password:'',
			editID:'',
			perfil:''
		});
		this.props.cleanState();
		this.props.history.push("/Users"); 
	}
		getDataToSend = () =>{
    	
    const query = this.state.editID;
    
    const data = {
    	firstName: this.state.firstName,
    	lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      perfil: this.state.perfil
    }
    
    if (query === undefined) {
    	this.props.AddUser(data).then(response =>{
    		if (response) {
    			this.props.history.push("/Users");
    		}
    	});
    }else{
      	this.props.editUserData(query,data).then(response =>{
    		if (response) {
    			this.props.history.push("/Users");
    		}
    	});
    }
    
    this.setState({ 
    	isOpen: false,
    	editData: {}
    });
	}

	render(){
		
		const valor = this.props.perfiles.find(element => {
  		return element._id === this.state.perfil;
		});
		
		return(	
			<div className="col-6 formAdd">
			<Panel bsStyle="default">
			<Panel.Heading>
			<Panel.Title componentClass="h3">Cargar usuarios</Panel.Title>
			</Panel.Heading>
			<Panel.Body>
			<form className="form" >
			 	<FormGroup>  
				  <input type="hidden" id ="editID" value={this.state.editID} name="editID" />
				  <label htmlFor="firstName"> Nombre:</label>
				  <input type="text" className="form-control " id="firstName" placeholder="Nombre..." value={this.state.firstName}  onChange={this.handleChange} />
				  <label htmlFor="lastName"> Apellido:</label>
				  <input type="text" className="form-control " id="lastName" placeholder="Apellido..." value={this.state.lastName}  onChange={this.handleChange} />
				  <label htmlFor="perfil"> Perfil:</label>
				  <select id="perfiles" className="form-control" onChange={this.handleChange}>
				  {
				  	valor != undefined ? <option value={valor._id}>{valor.perfilName}</option>	: <option value="">Seleccione</option>
				  }
				  
				  {
				  	this.props.perfiles && this.props.perfiles.map((perfil,key) =>(
	            <option key={key} value={perfil._id} >{perfil.perfilName}</option>
	          ))
				  }
				  </select>
				  <label htmlFor="UserName"> Usario:</label>
				  <input type="text" className="form-control " id="userName" placeholder="userName..." value={this.state.userName}  onChange={this.handleChange} />
				  <label htmlFor="apellido">Email:</label>
				  <input type="email" className="form-control" id="email" placeholder="Email..." value={this.state.email}  onChange={this.handleChange} />
				  <label htmlFor="pass">Password:</label>
				  <input type="password" className="form-control" id="password" placeholder="password..." value={this.state.password}  onChange={this.handleChange} />
	      <FormControl.Feedback />   
      </FormGroup>
			</form>
			</Panel.Body>
			<Panel.Footer>
			<div className="row">
			  	<div className="col-md-6 ">
				  	<button className ="btn btn-success formButton" onClick={this.getDataToSend}>Guardar</button>
					</div>
					<div className="col-md-6" >
						<button onClick={this.cancelar} className ="btn btn-danger formButton" >Cancelar</button>
					</div>
			  </div>
			</Panel.Footer>
			</Panel>      
			</div>

		);
	}
}
export default connect(state =>({
	dataToEdit: state.usersData.singleUser,
	perfiles: state.usersData.allProfiles

}),actions)(Formulario);