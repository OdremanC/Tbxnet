//Dependencias
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import './menuComp.css';



class Formulario extends Component{
  
  constructor(props){
    super(props);

    this.state = {
      title: '',
      url: '',
      editID:''
    };
   
  }
  
  static propTypes = {


  }
componentDidMount(){
    this.setState({
      title: this.props.dataToEdit.title,
      url: this.props.dataToEdit.url,
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
    }
  }


  render(){
    return( 
      <div className="contenForm"> 
        <form className="form" >
          <label htmlFor="Title"> Titulo:</label>
          <input type="text" className="form-control " id="title" placeholder="Titulo.." value={this.state.title}  onChange={this.handleChange} />
          <label htmlFor="url"> URL:</label>
          <input type="text" className="form-control " id="url" placeholder="URL...." value={this.state.url}  onChange={this.handleChange} />
          <div className="row">
            <div className="col-md-6 ">
              <button className ="btn btn-success formButton" onClick={() => {this.props.passDataToParent(this.state)}}>Guardar</button>
            </div>
            <div className="col-md-6" >
              <button  className ="btn btn-danger formButton" onClick={()=>this.props.putCloseModal(false)} >close</button>
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