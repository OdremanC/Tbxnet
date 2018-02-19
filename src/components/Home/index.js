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
import  Table from './tableComponents/TableGenerator';


import { getValueLogin,getUserIdFromCookie } from '../Global/Functions/';
//formulario
import Formulario from './Formularios/formClientes';

//tooltips
import ReactTooltip from 'react-tooltip';


class Home extends Component {

   constructor(props) {
    super(props);

    this.state = {
     
    };
  }

  static propTypes = {
    isMobile: PropTypes.bool
  };

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
  componentWillMount(){
    
    if (getValueLogin() !== true) {
         this.props.history.push('/login');
    }
  }

  render() {
    //DATA DE CABECERAS DE LA TABLA
    const cabeceras = [
      {key:1,nombre:"ID"}
    ];

   const { isMobile } = this.props; 
    return (
      <div>
        <div className="Home" >
          <button onClick={this.openModal} className= "btn btn-success">Add</button> 
          <div >
             
            <Modal 
              show={this.state.isOpen}
              onAfterOpen={this.afterOpenModal}
              onClose={this.closeModal}
              contentLabel="ModalForm" 
            >
            </Modal>
          </div>
        </div>
      </div>   
    );
  }
}
//conectamos con redux
export default connect(state => ({
 
}))(Home);
