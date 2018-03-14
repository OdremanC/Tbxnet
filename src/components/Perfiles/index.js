// Dependencies
import React, { Component } from 'react'; 
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { isFirstRender } from '../../lib/utils/frontend';
import { connect } from 'react-redux';
// Utils
import  Modal from '../Global/ModalComponent/Modal';
import { getValueLogin, getUserIdFromCookie } from '../Global/Functions/';
//tooltips
import ReactTooltip from 'react-tooltip';
import Table from './tablaPerfiles';

import * as actions from './actions';
import Alerts from '../Global/alerts';
import * as FontAwesome from 'react-icons/lib/fa';
import './perfiles.css';

class Perfiles extends Component{
  constructor(props){
    super(props)

    this.state = {
      isOpen:false,
      form:false,
      editData:{},
      message:'',
      alertTipo:''
    }
  }
  static propTypes = {

  }
  componentWillReceiveProps(nextProps){
  
    if (nextProps.mensaje) {
      this.setState({
        message: nextProps.mensaje.message,
        alertTipo: nextProps.mensaje.tipo
      });
    }
  }
  componentDidMount(){
    this.props.getAllPerfiles();
    
  }
  openModal =() =>{
    this.setState({
      isOpen: !this.state.isOpen,
      form: true
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
    this.props.deletePerfil(query).then(response =>{
      if(response.value.mensaje.tipo ==="success"){
        this.props.resetAlerts();
      }
    });
  }
  handleEditarIndex = (event) => {
    const perfilID = event;
    this.props.history.push("/addPerfil/"+ perfilID);
  }

  render(){
     const cabeceras = [
        {key:1,nombre:"ID"},
        {key:2,nombre:'Perfil'},
        {key:3,nombre:'Secciones'},        
        {key:4,nombre: "Acciones"}
     ];
    const  { dataToModal } = this.props;
    

    return(
      <div className="Perfiles">
      <Link to="/addPerfil" className= "btn btn-success botonAdd"><FontAwesome.FaPlus /></Link> 
      
       <Table className="tabla"
        cabeceras ={cabeceras}
          tableData ={this.props.perfiles}
          handleEliminar = {e =>this.handleEliminarItem(e)}
          handleEditar = {e =>this.handleEditarIndex(e)}
          singleParam={e=>{this.singleClient(e)}}
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
export default connect(state=>({
perfiles: state.perfileReducer.perfiles,
mensaje : state.perfileReducer.alert
}),actions)(Perfiles);