//Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';
import './perfiles.css';
import Alerts from '../Global/alerts';
import { getValueLogin } from '../Global/Functions/';
import { getAllMenu } from '../Secciones/actions';


class Formulario extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      perfil: '',
      editID:'',
      seccion: [{ url: '' , title:'', menu: false }],
      message: '',
      alertTipo: '',
      disabled:true,
      allSections: []
    };
   
  }
  
  static propTypes = {
    
  }

  componentWillReceiveProps(nextProps){
    
    if (!getValueLogin()) {
        this.props.history.push('/login');
    }
    if (nextProps.perfil.perfilName) {
      this.setState({
        editID: nextProps.perfil._id,
        perfil: nextProps.perfil.perfilName,
        seccion: nextProps.perfil.sections
      });
    }

    if (nextProps.mensaje) {
      this.setState({
        message: nextProps.mensaje.message,
        alertTipo: nextProps.mensaje.tipo
      });

      if(nextProps.mensaje.tipo ==='success'){
        setTimeout(() =>{ 
          this.props.history.push("/perfiles"); 
        }, 2000);
        
      }
    }
  }
  componentWillMount(){
    if (!getValueLogin()) {
      this.props.history.push('/login');
    }
    this.props.resetAlerts();
    this.setState({
      perfil:'',
      seccion: [{ url: '' , title:'', menu: false }]
    });
  }
  componentDidMount(){
    getAllMenu().payload.then(response => {
      this.setState({
        allSections: response
      })
    });
    
    if (this.props.match.params.id) {
      const query = this.props.match.params.id;  
      this.props.getSingle(query).then(response=>{
        if(response.value.mensaje.tipo ==="success"){
          this.props.resetAlerts();
        }
      });
    }
  }

  handleChange = (event) =>{
    const state =  this.state;
    state[event.target.id] = event.target.value;    
    this.setState(state);
  }
  handleurlNameChange = (idx) => (evt) => {
    
    const newurl = this.state.seccion.map((seccion, sidx) => {
      if (idx !== sidx) return seccion;
      return { ...seccion, url: evt.target.value, title: evt.target.selectedOptions[0].innerHTML, menu: evt.target.selectedOptions[0].id};
    });
    
    this.setState({ 
      seccion: newurl
    });

  }
  
  handleAddurl = () => {
    this.setState({ seccion: this.state.seccion.concat([{ url: '', title:'', menu: false }]) });
  }
  
  handleRemoveurl = (idx) => () => {
    this.setState({ seccion: this.state.seccion.filter((s, sidx) => idx !== sidx) });
  }
  getDataForm = (e) => {
    e.preventDefault();
    const data = {
      perfilName: this.state.perfil,
      sections: this.state.seccion
    }
    
    if (this.state.editID) {
      const query = this.state.editID;  
      this.props.updatePerfil(query,data).then(response=>{
        if(response.value.mensaje.tipo ==="success"){
          //this.props.resetAlerts();
        }
      });
    }else{
      this.props.addPerfil(data).then(response=>{
        if(response.value.mensaje.tipo ==="success"){
          //this.props.resetAlerts();
        }
      });
    } 
  }
  handleCancelar = () =>{
    this.setState({
      perfil:'',
      seccion: [{ url: '' , title:'', menu: false }]
    });
    this.props.resetPerfil();
    this.props.history.push("/perfiles");
  }
  
  render(){
    const { mensaje } = this.props;
    const { allSections } = this.state;
        
    return( 
      <div className="col-8 formulario">
        <form className="form">
          <label htmlFor="Perfil"> Perfil:</label>
          <input type="text" className="form-control " id="perfil" placeholder="Perfil nombre.." value={this.state.perfil}  onChange={this.handleChange} />
          
          <label htmlFor="secciones">SECCIONES</label>
            {
              this.state.seccion && this.state.seccion.map((seccion, idx) => (
                <div className="shareholder" key={idx}>
               
                  <select
                    className="form-control"
                    onChange={this.handleurlNameChange(idx)}
                  >
                  
                  {
                    <option value={seccion.url}>{seccion.title}</option>
                  }
                  { 
                    allSections && allSections.map((secciones,key) =>(
                      <option key={key} id={secciones.menu} value={secciones.url} >{secciones.title}</option>
                    ))    
                  }
                  </select>

                  <button type="button" onClick={this.handleRemoveurl(idx)} className="btn btn-danger small">-</button>
                </div>
              ))
            }
            <div>
              <button type="button" onClick={this.handleAddurl} className="btn btn-primary small">+ Seccion</button>
            </div>
            <div className="row">
              <div className="col-md-3">
                <button className ="btn btn-primary formButton" onClick={(e)=>{this.getDataForm(e)}}>Guardar</button>
              </div>
              <div className="col-md-3" >
                <button className ="btn btn-default formButton"  onClick={this.handleCancelar}>Cancelar</button>
              </div>
            </div>
        </form>

        <Alerts 
          message={this.state.message} 
          tipo={this.state.alertTipo}      
        />
      </div>
    );
  }
}
export default connect(state=>({

mensaje: state.perfileReducer.alert,
perfil: state.perfileReducer.perfil

}),actions)(Formulario);