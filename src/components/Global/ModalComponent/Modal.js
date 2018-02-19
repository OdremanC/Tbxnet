// Dependencies
import React, { Component } from 'react';
//MODAL
import ModalGlobal from 'react-modal';
import PropTypes  from 'prop-types';

// Assets
//import './css/Footer.css';

class Modal extends Component {

  static propTypes = {
    onClose: PropTypes.func,
  	show: PropTypes.bool,
  	children: PropTypes.node
  };

  render(){
  	
  	if(!this.props.show) {
      return null;
    }
       // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '100px auto 100px auto',
      padding: 30,
      display: 'block'
    };
		return (    
	    <div className="backdrop" style={backdropStyle}> 
        <div className="modal" style={modalStyle}>
	        {this.props.children}
  	     <div className="footer">
  	     </div>
	     </div>
	    </div>    
    );
	}
}

export default Modal;

	


		