// Dependencies
import React, { Component } from 'react'; 
//LINK sirve para crear enlaces
import { Link } from 'react-router-dom'; 
import PropTypes  from 'prop-types';
import { connect } from 'react-redux';
import { getValueLogin,getUserIdFromCookie } from '../Global/Functions/';
//tooltips
import ReactTooltip from 'react-tooltip';
import './css/menu.css';

class Menu extends Component{
    constructor(props){
        super(props)
    }

    static propTypes = {

    }

    render(){
        return(
            <div className="Menu">
                <div className="sidebar-nav">
            <div className="well">
                <ul className="nav nav-list"> 
                  <li className="nav-header">Main</li>        
                  <li className="active"><a href="../aaa/index"><i className="icon-home"></i> Dashboard</a></li>
                  <li><a href="#"><i className="but-primary"></i> Add Blog Post</a></li>
                  <li><a href="#"><i className="icon-calendar"></i> Calendar</a></li>
                  <li><a href="#"><i className="icon-user"></i> Members</a></li>
                  <li><a href="#"><i className="icon-comment"></i> Comments</a></li>
                  <li><a href="#"><i className="icon-picture"></i> Gallery</a></li>
                </ul>
            </div>
        </div>
            </div>
       
        );    

    }
}
export default Menu;