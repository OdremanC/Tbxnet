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
          
            </div>
       
        );    

    }
}
export default Menu;