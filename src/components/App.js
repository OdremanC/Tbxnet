// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Header from './Global/Header';
import Content from './Global/Content';
import Footer from './Global/Footer';
import Navbar from './Global/Navbar';
import Menu from './Global/Menu'

// Data
import items from '../data/menu';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div className="App">
        <Header title="React Api Test"/>
        <Navbar title="React Api Test" items={items}/>
        <Content>
          {children}
        </Content>
        
      </div>
    );
  }
}

export default App;
