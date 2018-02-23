// Dependencies
import React, { Component } from 'react';  
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//cookies
import Cookies from 'universal-cookie';

import * as actions from '../Menu/actions';
import { getValueLogin, getUserNameLogin } from '../Global/Functions/';

const cookies = new Cookies();


// Assets
import './css/Navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      dataMenu: [],
      isLogin: false,
      userName:''
    }
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };
   componentWillReceiveProps(nextProps){
      
      
  }
  componentDidMount(){
    this.props.getAllMenu();
  }

  logout = (event)=>{
    event.preventDefault();
    if (cookies.get('isLogged').isLogged) {
     cookies.remove('isLogged');
     window.location.assign("http://localhost:3000/login")
    }
  }
  
  render() {

    const { title, items,logueado } = this.props;
    const { userName,isLogin } =this.state;  
    

    return (
      <nav className="navbar navbar-expand-lg navbar-inverse">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
              {
                getValueLogin() && this.props.menuData.map(
                  (item, key) => <li key={key} className="nav-li"><Link className="link-nav" to={item.url}>{item.title}</Link></li>
                )
              }
          </ul>
          <div className="navbar-header">
            <Link to="/user" className="navbar-brand userColor">{getUserNameLogin()}</Link>
          </div>
            {
              getValueLogin() && <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>Logout</button>
            }
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(state=>({
  routes: state.router,
  menuData: state.menuReducer.menuData
}),actions)(Navbar));
