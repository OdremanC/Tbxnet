// Dependencies
import React, { Component } from 'react'; 
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
// Utils
import { isFirstRender } from '../../lib/utils/frontend';
import  Modal from '../Global/ModalComponent/Modal';
import { getValueLogin, getUserIdFromCookie } from '../Global/Functions/';
//tooltips
import ReactTooltip from 'react-tooltip';
import Table from './tablaMenu';
import Formulario from './fomularioMenu';
import Alerts from '../Global/alerts';
import * as actions from './actions';
import './menuComp.css';

class MenuData extends Component{
  constructor(props){
    super(props)

    this.state = {
      isOpen:false,
      editData:{},
      message:'',
      alertTipo:''
    }
  }

  static propTypes = {

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
  componentWillReceiveProps(nextProps){
  
    if (nextProps.mensaje !== undefined) {
      this.setState({
        message: nextProps.mensaje.message,
        alertTipo: nextProps.mensaje.tipo
      });
    }
  }
  componentWillMount(){
    this.props.resetAlerts();
    if (getValueLogin() !== true) {
      this.props.history.push('/login');
    }
  }
  componentDidMount(){
    this.props.getAllMenu();
    this.props.resetAlerts();  
  }

  handleEliminarItem = (id) =>{
    const query = id;
    this.props.deleteSection(query).then( response => {
        if (response.value.mensaje.tipo ==="success") {
          this.props.resetAlerts();
        }
    });
  }

  handleEditarIndex = (event) => {
    const menuID = event;
    var resultObject = this.props.secciones.find(function(menu){
      return menu._id === menuID;
    });

    if(resultObject && resultObject._id.length > 0){
      this.setState({
        isOpen: !this.state.isOpen,
        editData:resultObject
      });
    };
  }
  getDataFormChild = (dataFromForm) =>{
      
    const query = dataFromForm.editID;
    const data = {
     title: dataFromForm.title,
     url:dataFromForm.url,
     menu: dataFromForm.chkbox
    }
    
    if (query === undefined) {
      this.props.addMenu(data).then( response => {
        if (response.value.mensaje.tipo ==="success") {
          this.props.resetAlerts();
        }
      });
    }else{
      this.props.editSection(query,data).then( response => {
        if (response.value.mensaje.tipo ==="success") {
          this.props.resetAlerts();
        }
      });
    }
    
    this.setState({ 
        isOpen: false,
        editData: {}
    })
  }

  render(){
    console.log(this.state)
      const cabeceras = [
        {key:1,nombre:"ID"},
        {key:2,nombre:'Title'},
        {key:3,nombre:'URL'},
        {key:4,nombre: 'Menu'},
        {key:5,nombre: "Acciones"}
     ];
    
const element = <Formulario passDataToParent = {this.getDataFormChild} putCloseModal = {this.closeModal} dataToEdit={this.state.editData}></Formulario>;
    return(
      <div className="MenuData">
      <button className= "btn btn-success botonAdd" onClick={this.openModal}>Add</button> 
      
      <Table className="tabla"
        cabeceras ={cabeceras}
          tableData ={this.props.secciones}
          handleEliminar = {e =>this.handleEliminarItem(e)}
          handleEditar = {e =>this.handleEditarIndex(e)}
          singleParam={e=>{this.singleClient(e)}}
      >
      </Table>
      <Modal className="modal"
          show={this.state.isOpen}
          onClose={this.closeModal}
          children={element}
          title= "Add Urls"
        />
        <Alerts 
          message={this.state.message} 
          tipo={this.state.alertTipo}      
        />
      </div>
    );
  }
}
export default connect(state=>({
  secciones: state.sectionsReducer.secciones,
  mensaje : state.sectionsReducer.alert
}),actions)(MenuData);