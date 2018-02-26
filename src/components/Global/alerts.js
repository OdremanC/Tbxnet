// Dependencies
import React, { Component } from 'react'; 
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
//import AlertContainer from 'react-alert';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
class Alerts extends Component {
  constructor(props){
    super(props);

    this.state = {
     
    };
  }

  static propTypes = {

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tipo === 'success'){
       Alert.success(nextProps.message, {
        position: 'bottom-right',
        effect: 'slide',
        onShow: function () {
            console.log('Success!')
        },
        beep: false,
        timeout: 3000,
        offset: 100
      });
    }else if(nextProps.tipo === 'error'){
      Alert.error(nextProps.message, {
        position: 'bottom-right',
        effect: 'slide',
        onShow: function () {
            console.log('error!')
        },
        beep: false,
        timeout: 3000,
        offset: 100
      });
    }
  }

  render(){
    
    return(
      <div className="Modal">
      <Alert stack={{limit: 1}} />
      </div>
    );
  }
}
export default Alerts;