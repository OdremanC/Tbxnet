import React, { Component,PropTypes } from 'react';  
import { connect } from 'react-redux';  
import { push } from 'react-router-redux';
import { getValueLogin, getUserNameLogin, getPerfil } from '../Global/Functions/';
export default function requiresAuth(Component) {  
  class AuthenticatedComponent extends Component {
    static propTypes = {
      
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount(){
      const { dispatch } = this.props;
      if (!getValueLogin()) {
        dispatch(push('/login'));
      }
    }
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { dispatch } = this.props;

      let actualPath = location.pathname;
      let pathAccess = false;
      if (this.props.menuData.sections) {
         pathAccess = this.props.menuData.sections.find( element => {
          return element.url === actualPath;
        });
        if (pathAccess === undefined) {
          dispatch(push('/'));
        }
      }
    }

    render() {
      const { menuData } = this.props;
    
      let actualPath = location.pathname;
      let ruta = false;
      if (menuData.sections) {
         ruta = menuData.sections.find( element => {
          return element.url === actualPath;
        });  
      }
    
      return (
        <div className="authenticated">
          { 
            ruta && ruta ? <Component {...this.props} /> : null 
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      menuData: state.usersData.perfilLog
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
