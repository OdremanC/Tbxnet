// Dependencies
import React, { Component } from 'react';
//MODAL
//import ModalGlobal from 'react-modal';
//import Modal from 'react-awesome-modal';
import { Modal,Button } from 'react-bootstrap';
import PropTypes  from 'prop-types';

// Assets
import './modal.css';

class ModalGlobal extends Component {
  constructor(props){
    super(props)

    this.state = {
      show: false,
      title: '',
      children: {}
    }
  }
  static propTypes = {
    onClose: PropTypes.func,
  	show: PropTypes.bool,
  	children: PropTypes.node
  };
  componentWillReceiveProps(nextProps){  
    if (nextProps) {
      this.setState({
        show:nextProps.show,
        title: nextProps.title,
        children: nextProps.children
      });
    }
  }
  openModal() {
   this.setState({
      show : true
    });
  }
 
  closeModal() {
    this.setState({
      show : false,
      titulo: '',
      children: {}
    });
  }

  render(){
  	
  	if(!this.props.show) {
      return null;
    }
  

		return (    
	    
      <section>

      <div className="contained-modal" >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body >{this.props.children}</Modal.Body>
          <Modal.Footer>
        
        </Modal.Footer>
        </Modal.Dialog>
      </div>
      </section>
	    
    );
	}
}

export default ModalGlobal;

	


		