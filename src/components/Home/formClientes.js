//Dependencias
import React, { Component } from 'react';

import PropTypes  from 'prop-types';


class Formulario extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			nombre: '',
			apellido: '',
			dni:0,
			editID:'',
			civilState: ''
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
			case"nombre":
				this.setState({
					nombre : event.target.value
				});
				break;
			case"apellido":
				this.setState({
					apellido : event.target.value
				});
				break;
			case"dni":
				this.setState({
					dni : event.target.value
				});
				break;
			case"estadoCivil":
				this.setState({
					civilState : event.target.value
				});
				break;
		}
	}
	componentDidMount(){

		this.setState({
			nombre: this.props.dataToEdit.name,
			apellido: this.props.dataToEdit.lastName,
			dni: this.props.dataToEdit.dni,
			civilState: this.props.dataToEdit.civilState,
			editID: this.props.dataToEdit._id
		});
	}


	render(){
		return(
			<form className="form" >
			  	<label htmlFor="nombre"> Name:</label>
			  	<input type="hidden" id ="editID" value={this.state.editID} name="editID" />
			  	<input type="text" className="form-control" id="nombre" placeholder="Nombre..." value={this.state.nombre}  onChange={this.handleChange} />
			  	<label htmlFor="apellido">lastName:</label>
			  	<input type="text" className="form-control" id="apellido" placeholder="Apellido..." value={this.state.apellido}  onChange={this.handleChange} />
			  	<label htmlFor="dni">DNI:</label>
			  	<input type="number" className="form-control" id="dni" placeholder="DNI..." value={this.state.dni}  onChange={this.handleChange} />
			  	<label htmlFor="estadoCivil">Estado Civil:</label>
			  	<select className="form-control" id="estadoCivil" onChange={this.handleChange}>
			    	<option value={this.state.civilState}>{this.state.civilState}</option>
			    	<option value ="Casado">Casado</option>
			    	<option value ="Soltero">Soltero</option>
			  	</select>
			  	<div className="row">
			  		<div className="col-md-6 ">
					  	<button className="form-control btn btn-success" type="button" onClick={(event) => {this.props.passDataToParent(this.state)}}>Guardar</button> 
					</div>
					<div className="col-md-6" >
						<button className ="form-control btn btn-danger" onClick={(event)=>this.props.putCloseModal(false)} >close</button>
					</div>
			  	</div>
			</form>
		);
	}
}
export default Formulario;