//Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/perfiles.css';
import Alerts from '../../Global/alerts';
import { getValueLogin } from '../../Global/Functions/';


class Formulario extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      perfil: '',
      editID:'',
      seccion: [{ url: '' , title:'' }],
      message: '',
      alertTipo: '',
      disabled:true
    };
   
  }
  
static propTypes = {
}

componentWillReceiveProps(nextProps){
  if (getValueLogin() !== true) {
      this.props.history.push('/login');
  }
  if (nextProps.perfil.perfilName !== undefined) {
    this.setState({
      editID: nextProps.perfil._id,
      perfil: nextProps.perfil.perfilName,
      seccion: nextProps.perfil.sections
    });
  }

  if (nextProps.mensaje !== undefined) {
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

  this.setState({
    perfil:'',
    seccion: [{ url: '' , title:'' }]
  });
}
componentDidMount(){
  if (this.props.match.params.id) {
    const query = this.props.match.params.id;  
    this.props.getSingle(query).then(response=>{
      if(response.value.mensaje.tipo ==="success"){
        this.props.resetAlerts();
      }
    });
  }
}


componentDidUpdate(prevProps, prevState){
  console.log(prevProps)
  console.log(prevState)
}



  handleChange = (event) =>{
    switch(event.target.id){
      case "perfil":

        this.setState({
          perfil : event.target.value
        });
      break;
    }
  }
  handleurlNameChange = (idx) => (evt) => {
    //console.log(evt.target.selectedOptions[0].innerHTML)
    const newurl = this.state.seccion.map((seccion, sidx) => {
      if (idx !== sidx) return seccion;
      return { ...seccion, url: evt.target.value, title: evt.target.selectedOptions[0].innerHTML};
    });
    
    this.setState({ 
      seccion: newurl
    });

  }
  
  handleAddurl = () => {
    this.setState({ seccion: this.state.seccion.concat([{ url: '', title:'' }]) });
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
  
  render(){
    const { secciones,mensaje } = this.props;
    
    
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
                    secciones && secciones.map((secciones,key) =>(
                      <option key={key} value={secciones.url} >{secciones.title}</option>
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
                <Link to="/perfiles" className ="btn btn-default formButton"  >Cancelar</Link>
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
secciones: state.menuReducer.menuData,
mensaje: state.perfileReducer.alert,
perfil: state.perfileReducer.perfil

}),actions)(Formulario);