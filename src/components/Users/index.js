// Dependencies
import React, { Component } from 'react';
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
//Manejo de props
import PropTypes  from 'prop-types';
//conexion a redux
import { connect } from 'react-redux';
import { getUserJwt,getValueLogin } from '../Global/Functions/';

import  Modal from '../Global/ModalComponent/Modal';
import Formulario from './formUsers';
import Table from './TableGenerator';
//import Formulario from './Formularios/formStock';
import * as actions from './actions';
import Alerts from '../Global/alerts';
const token = getUserJwt();
class Users extends Component {
	constructor(props){
		super(props)
		this.state={

			isOpen:false,
			editData:{},
      message:'',
      alertTipo:''
		}
	}

	static proptypes = {
		getAllUsers: PropTypes.func
	}
	componentWillReceiveProps(nextProps){
    if (nextProps.mensaje) {
      this.setState({
        message: nextProps.mensaje.message,
        alertTipo: nextProps.mensaje.tipo
      });
    }
  }
  componentWillMount(){
		if (!getValueLogin()) {
     	this.props.history.push('/login');
    }
	}
	
  componentDidMount(){
    const token = getUserJwt();
    this.props.getAllUsers(token);
    this.props.getProfiles();
  }

	openModal =() =>{
  	this.setState({
    	isOpen: !this.state.isOpen
  	});
	}
   
  closeModal = (close) => {
    	this.setState({
      	isOpen: close,
      	editData: {}
    	});
  }

  handleEliminarItem = (id) =>{
		const query = id;
		this.props.deleteUser(query,token);
	}

	handleEditarIndex = (event) => {
    const userID = event;
    this.props.history.push("/addUser/"+userID)
  }

	render(){
		
		const { DataUsers } = this.props;

		const cabeceras = [
	      {key:1,nombre:"ID"},
	      {key:2,nombre:'First Name'},
	      {key:3,nombre:'Last Name'},
	      {key:4,nombre: "UserName"},
	      {key:5,nombre: "Email"},
        {key:6,nombre: "Perfil"},
	      {key:7,nombre: "Acciones"}
	   ];
	 
		return (
			<div className="Users">
			 <Link to="/addUser"className= "btn btn-success">Add</Link> 
			 <h2>All users</h2>
			 
			<Table
				cabeceras ={cabeceras}
        	tableData ={this.props.DataUsers}
        	handleEliminar = {e =>this.handleEliminarItem(e)}
        	handleEditar = {e =>this.handleEditarIndex(e)}
          singleParam={e=>{this.singleClient(e)}}
          profiles={this.props.perfiles}
			>
			</Table>
      <Alerts 
        message={this.state.message} 
        tipo={this.state.alertTipo}      
       />
			</div>
		);
	}
}
export default connect(state => ({
	DataUsers: state.usersData.users,
  perfiles: state.usersData.allProfiles,
  mensaje : state.usersData.alert
}), actions)(Users);
