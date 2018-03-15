//Dependencias
import React, { Component } from 'react';
import { Panel,FormGroup,FormControl,ControlLabel,HelpBlock } from 'react-bootstrap'
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { getUserJwt,getValueLogin } from '../Global/Functions/';
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
			perfiles:'',
			userProfile:[],
			valor: undefined,
			message:'',
      alertTipo:''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	static propTypes = {
		getDataFormChild: PropTypes.func,
		putCloseModal: PropTypes.func,
		addOpen: PropTypes.bool

	}
	componentWillMount(){
		if (!getValueLogin()) {
     	this.props.history.push('/login');
    }
	}

	handleChange =(event) => {
		const state = this.state; 
		state[event.target.id] = event.target.value;
		 this.setState(state);
	}

	componentWillReceiveProps(nextProps){
		const dataToEdit = nextProps.dataToEdit;
		
		if (nextProps.mensaje) {
      this.setState({
        message: nextProps.mensaje.message,
        alertTipo: nextProps.mensaje.tipo
      });
    }
		if (nextProps.dataToEdit) {
			this.setState({...dataToEdit, editID: dataToEdit._id});
		}
	}

	componentDidMount(){
		const token = getUserJwt();
		this.props.resetAlerts();
		this.props.getProfiles();

		if (this.props.match.params.id) {
			const query = this.props.match.params.id;
			this.props.getUser(query,token);
		}

		if (this.props.dataToEdit) {
			const dataToEdit = this.props.dataToEdit;

			this.setState({
				...dataToEdit,
				editID: dataToEdit._id
			});
		}		
	}

	cancelar = () =>{
		this.clearState();
		this.props.resetSingleUserState();
		this.props.history.push("/Users"); 
	}
		getDataToSend = () => {
    	const token = getUserJwt();
	    const query = this.state.editID;
	    
	    const data = {
	    	firstName: this.state.firstName,
	    	lastName: this.state.lastName,
	    	userName: this.state.userName,
	    	password: this.state.password,
	    	email: this.state.email,
	    	perfil: this.state.perfiles
	    };
	    	    
	    if (!query) {
	    	this.props.AddUser(data).then(response =>{
	    		if (response.value.mensaje.tipo ==="success") {
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
    	editData: {}
    });
	}
	clearState = () => {
		this.setState({
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password:'',
			editID:'',
			perfiles:''
		});
	}
	render(){
		
		const valor = this.props.perfiles.find(element => element._id === this.state.perfiles);
		
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
				  <label htmlFor="perfiles"> Perfil:</label>
				  <select id="perfiles" className="form-control" onChange={this.handleChange}>
				  {
				  	valor && valor ? <option value={valor._id}>{valor.perfilName}</option>	: <option value="">Seleccione</option>
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
	perfiles: state.usersData.allProfiles,
	mensaje : state.usersData.alert
}),actions)(Formulario);