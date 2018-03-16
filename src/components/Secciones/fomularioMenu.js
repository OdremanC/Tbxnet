//Dependencias
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import './menuComp.css';
import { getValueLogin, getUserNameLogin, getPerfil } from '../Global/Functions/';


class Formulario extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      title: '',
      url: '',
      editID:'',
      chkbox: false
    };   
  }
  static propTypes ={

  }
  componentWillMount(){
    if (!getValueLogin()) {
      this.props.history.push('/login');
    }
  }
  
  componentDidMount(){
    
    this.setState({
       ...this.props.dataToEdit,
       chkbox: this.props.dataToEdit.menu,
       editID: this.props.dataToEdit._id
    });
  }

  handleChange = (event) =>{

    switch(event.target.id){
      case "title":
        this.setState({
          title : event.target.value
        });
      break;
      case "url":
        this.setState({
          url : event.target.value
        });
      break;
      case "chkbox":
        if (this.state.chkbox === false) {
          this.setState({
            chkbox: true
          });
        }else{
          this.setState({
            chkbox: false
          });
        }
      break;
    }
  }


  render(){
    
    return( 
      <div className="contenForm"> 
        <form className="form formularioSecciones" >
          <label htmlFor="Title"> Titulo:</label>
          <input type="text" className="form-control " id="title" placeholder="Titulo.." value={this.state.title}  onChange={this.handleChange} />
          <label htmlFor="url"> URL:</label>
          <input type="text" className="form-control " id="url" placeholder="URL...." value={this.state.url}  onChange={this.handleChange} />
          <div className="checkbox">
            <label className="chkbx">
              <input type="checkbox" value={this.state.chkbox} checked={this.state.chkbox} onChange={this.handleChange} id="chkbox" /> is a menu item?
            </label>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <button type="button" className ="btn btn-success formButton" onClick={() => {this.props.passDataToParent(this.state)}}>Guardar</button>
            </div>
            <div className="col-md-6" >
              <button type="button"  className ="btn btn-danger formButton" onClick={()=>this.props.putCloseModal(false)} >close</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(state=>({
  router: state.router
}))(Formulario);