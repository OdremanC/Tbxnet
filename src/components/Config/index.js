// Dependencies
import React, { Component } from 'react'; 
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
// Utils
import { isFirstRender } from '../../lib/utils/frontend';
import  Modal from '../Global/ModalComponent/Modal';
//import  FormsBuilder from '../Global/Modal';
import { getValueLogin,getUserIdFromCookie } from '../Global/Functions/';
//tooltips
import ReactTooltip from 'react-tooltip';
import './css/config.css';

class Config extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {

  }

  render(){
    return(
      <div className="Config ">
        <div className="list-group ">
          <div className="container ">
            <div className="row " >
              <div className="col-8">
                <p className="list-group-item list-group-item-action active">
                  configuraciones:
                </p>
                <Link to="/menu" className="list-group-item list-group-item-action">Menu</Link>
                <Link to="Perfiles" className="list-group-item list-group-item-action">Perfiles</Link>
                <Link to="/Secciones" className="list-group-item list-group-item-action">Secciones</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Config;
