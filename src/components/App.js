// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';
import Navbar from './Global/Navbar';
import Menu from './Global/Menu';
import { Link, withRouter } from 'react-router-dom';
import { getValueLogin } from './Global/Functions/';


// Data
import items from '../data/menu';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  componentWillMount(){
    if (getValueLogin() !== true) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { children } = this.props;
    
    return (
      <div className="App">
        <Header title="React Api Test"/>
        <Navbar title="TBXNET - Gestion"/>
        <Content>
          {children}
        </Content>
      </div>
    );
  }
}

export default withRouter(App);
