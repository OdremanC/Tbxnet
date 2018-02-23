// Dependencies
import React, { Component } from 'react';
//MODAL
//import ModalGlobal from 'react-modal';
import Modal from 'react-awesome-modal';
import PropTypes  from 'prop-types';

// Assets
import '../css/modal.css';

class ModalGlobal extends Component {
  constructor(props){
    super(props)

    this.state = {
      visible: false,
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
        visible:nextProps.show,
        title: nextProps.title,
        children: nextProps.children
      });
    }
  }
  openModal() {
   this.setState({
      visible : true
    });
  }
 
  closeModal() {
    this.setState({
      visible : false,
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
         <div className="container">
          <Modal className="modal" visible={this.state.visible} onClickAway={() => this.closeModal()}>
            <div>
              <div className="titulo">{this.state.title}</div>
              <div className="col-12 contenido">
                {this.state.children}
              </div>
            </div>
          </Modal>
        </div>
      </section>
	    
    );
	}
}

export default ModalGlobal;

	


		